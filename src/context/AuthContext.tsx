import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/router";
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
  session: Session | null | undefined;
  isLoggedIn?: boolean;
  isLoading?: boolean;
  login: (params: LoginParams) => any;
  signUp: (params: SignUpParams) => any;
  signOut: () => void;
  openLoginModal: () => void;
}

const [Provider, useAuthContext] = createContext<ContextValues>();

const AuthContextProvider: React.FC<any> = ({ children }) => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const { isOpen, onClose, onOpen: openLoginModal } = useDisclosure();

  const signOut = useCallback(() => {
    setUser(null);
    router.replace("/");
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
      setUser(user);
    }
  }, []);

  const getUserData = async (session: Session) => {
    try {
      const user = await Client.getUserById(session?.user?.id as string);
      setUser(user);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      getUserData(session);
    }
  }, [session]);

  useEffect(() => {
    const session = supabase.auth.session();
    if (!session) {
      setIsLoading(false);
    }
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
