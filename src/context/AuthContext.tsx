import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import useSwr from "swr";
import Client, { supabase } from "src/libs/supabase";
import { useEffect, useState, useCallback } from "react";
import { createContext } from "src/utils/createContext";
import { useDisclosure } from "@chakra-ui/react";
import LoginModal from "src/components/LoginModal";
import { User } from "src/types/schema";
import { ERROR_MESSAGES } from "src/contants/error-messages";

export interface LoginParams {
  email: string;
  password: string;
}

export interface SignUpParams {
  email: string;
  password: string;
  name: string;
}

export interface ContextValues {
  user: User | null;
  session: Session | null;
  isLoggedIn?: boolean;
  isLoading?: boolean;
  isFirstLoading?: boolean;
  login: (params: LoginParams) => any;
  signUp: (params: SignUpParams) => any;
  signOut: () => void;
  openLoginModal: () => void;
}

const [Provider, useAuthContext] = createContext<ContextValues>();

const AuthContextProvider: React.FC<any> = ({ children }) => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const { isOpen, onClose, onOpen: openLoginModal } = useDisclosure();

  const { data, error, mutate } = useSwr(session ? "userInfo" : null, () => {
    return Client.getUserById(session?.user?.id as string);
  });

  const isFirstLoading = !user || !error;
  const isLoading = !data || !error;

  const signOut = useCallback(() => {
    setUser(null);
    return supabase.auth.signOut();
  }, [router]);

  const login = useCallback(
    (params: LoginParams) => supabase.auth.signIn(params),
    []
  );

  const signUp = useCallback(async ({ name, ...rest }: SignUpParams) => {
    const { error, user: authUser } = await supabase.auth.signUp(rest, {
      data: {
        name,
      },
    });
    if (error) {
      if ((error as any)?.status === 400) {
        throw new Error(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
      } else {
        throw error;
      }
    } else {
      const { error: createUserError } = await supabase
        .from<User>("users")
        .insert({ id: authUser?.id, name, email: rest.email });
      if (createUserError)
        throw Error(createUserError.message ?? ERROR_MESSAGES.UNKNOWN);
      mutate();
    }
  }, []);

  useEffect(() => {
    if (data) {
      console.log("set user", data);
      setUser(data);
    }
  }, [data]);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
      }
    );
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const value = {
    user,
    session,
    isLoggedIn: user !== null,
    isLoading,
    isFirstLoading,
    signOut,
    login,
    signUp,
    openLoginModal,
  };

  return (
    <Provider value={value}>
      {children}
      <LoginModal isOpen={isOpen} onClose={onClose} />
    </Provider>
  );
};

export { useAuthContext };
export default AuthContextProvider;
