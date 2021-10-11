import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  Alert,
  AlertIcon,
  Container,
  Box,
  Button,
  Flex,
  Text,
  Heading,
  HStack,
  IconButton,
  Divider,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";
import { FaGoogle, FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { useAuthContext } from "src/context/AuthContext";
import { SignUpParams } from "src/context/AuthContext";
import isEmail from "validator/lib/isEmail";
import { VALIDATION_MESSAGES } from "src/contants/error-messages";
import Routes from "src/contants/routes";

const SignUp = () => {
  const { signUp, isLoggedIn, openLoginModal } = useAuthContext();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpParams>({
    defaultValues: { email: "", password: "" },
  });
  const [error, setError] = useState("");

  const onSubmit = async (data: SignUpParams) => {
    try {
      await signUp(data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push(Routes.HOME);
    }
  }, [isLoggedIn]);

  return (
    <Container maxW="lg" py="10">
      <Heading>Register</Heading>
      <HStack mt="8" justify="space-between" w="full">
        <IconButton
          width="64px"
          height="64px"
          fontSize="32px"
          borderRadius="full"
          aria-label="Google"
          icon={<FaGoogle />}
        />
        <IconButton
          width="64px"
          height="64px"
          fontSize="32px"
          borderRadius="full"
          aria-label="Facebook"
          icon={<FaFacebook />}
        />
        <IconButton
          width="64px"
          height="64px"
          fontSize="32px"
          borderRadius="full"
          aria-label="Twitter"
          icon={<FaTwitter />}
        />
        <IconButton
          width="64px"
          height="64px"
          fontSize="32px"
          borderRadius="full"
          aria-label="Github"
          icon={<FaGithub />}
        />
      </HStack>
      <Flex mt="8" alignItems="center">
        <Divider bg="gray.400" />
        <Text mx="4">Or</Text>
        <Divider bg="gray.400" />
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mt="8">
          <FormControl
            id="name"
            isInvalid={!!errors?.name}
            isDisabled={isSubmitting}
          >
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Name"
              type="text"
              size="lg"
              {...register("name", {
                required: VALIDATION_MESSAGES.REQUIRED,
              })}
            />
            <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl
            id="email"
            mt="8"
            isInvalid={!!errors?.email}
            isDisabled={isSubmitting}
          >
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Email"
              type="email"
              size="lg"
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
            mt="8"
            isInvalid={!!errors?.password}
            isDisabled={isSubmitting}
          >
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Password"
              type="password"
              size="lg"
              {...register("password", {
                required: VALIDATION_MESSAGES.REQUIRED,
              })}
            />
            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            mt="10"
            size="lg"
            variant="primary"
            w="full"
            h="60px"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Sign up
          </Button>
          <Text textAlign="center" mt="4">
            Already have an account?{" "}
            <Button onClick={() => openLoginModal()} variant="link">
              Login
            </Button>
          </Text>
          {error && !isSubmitting && (
            <Alert mt="4" borderRadius="lg" status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
        </Box>
      </form>
    </Container>
  );
};

export default SignUp;
