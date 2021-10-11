import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Alert,
  AlertIcon,
  Heading,
  Button,
  Modal,
  ModalProps,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Text,
} from "@chakra-ui/react";
import { useAuthContext } from "src/context/AuthContext";
import isEmail from "validator/lib/isEmail";
import {
  VALIDATION_MESSAGES,
  ERROR_MESSAGES,
} from "src/contants/error-messages";
import { LoginParams } from "src/context/AuthContext";

type LoginModalProps = Pick<ModalProps, "isOpen" | "onClose">;

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { login } = useAuthContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginParams>({
    defaultValues: { email: "", password: "" },
  });
  const [error, setError] = useState("");

  const onSubmit = async (data: LoginParams) => {
    const { error } = await login(data);
    if (error) {
      setError(ERROR_MESSAGES.USER_NOT_FOUND);
      return;
    }
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen]);

  return (
    <Modal size="xl" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader
            textAlign="center"
            py="30px"
            borderBottomWidth="1px"
            borderBottomColor="gray.200"
          >
            <Heading fontSize="1.5rem" lineHeight="base">
              Login
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody px="10" py="6">
            <FormControl
              id="email"
              isInvalid={!!errors?.email}
              isDisabled={isSubmitting}
            >
              <FormLabel mb="4" fontSize="2xl" fontWeight="semibold">
                Email
              </FormLabel>
              <Input
                h="60px"
                placeholder="Email"
                type="email"
                borderRadius="xl"
                {...register("email", {
                  required: VALIDATION_MESSAGES.REQUIRED,
                  validate: (value) =>
                    isEmail(value) || VALIDATION_MESSAGES.MUST_BE_EMAIL,
                })}
              />
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
              id="password"
              mt="10"
              isInvalid={!!errors?.password}
              isDisabled={isSubmitting}
            >
              <FormLabel mb="4" fontSize="2xl" fontWeight="semibold">
                Password
              </FormLabel>
              <Input
                h="60px"
                placeholder="Password"
                type="password"
                borderRadius="xl"
                {...register("password", {
                  required: VALIDATION_MESSAGES.REQUIRED,
                })}
              />
              <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter
            px="10"
            py="30px"
            borderTopWidth="1px"
            borderTopColor="gray.200"
            display="block"
          >
            <Button
              type="submit"
              h="60px"
              size="lg"
              w="full"
              variant="primary"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Login
            </Button>
            <Text textAlign="center" mt="4">
              Don't have account?{" "}
              <Link href="/signup">
                <Button variant="link">Sign up</Button>
              </Link>
            </Text>
            {error && (
              <Alert mt="4" borderRadius="lg" status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default LoginModal;
