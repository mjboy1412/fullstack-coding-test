import React, { useState, useCallback, useContext } from "react";
import Link from "next/link";
import { Container, FormControl, FormLabel, Input, Button, Heading, FormErrorMessage, Text } from "@chakra-ui/react";
import * as yup from "yup";
import { debounce } from "lodash";
import { useRouter } from "next/router";

import useValidation from "hooks/useValidation";
import { firebase } from "firebaseClient";
import { AuthContext } from "HOC/AuthProvider";

const emailSchema = yup.string().email().required();
const passwordSchema = yup.string().min(8).required();

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [responseError, setResponseError] = useState<string>("");
  const { user, setUser } = useContext(AuthContext);

  const router = useRouter();
  const emailErrors = useValidation({ value: email, schema: emailSchema });
  const passwordErrors = useValidation({ value: password, schema: passwordSchema });

  const handleChangeEmail = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>): void => {
      event.preventDefault();
      const { value } = event.target;
      setEmail(value);
    }, 500),
    []
  );

  const handleChangePassword = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>): void => {
      event.preventDefault();
      const { value } = event.target;
      setPassword(value);
    }, 500),
    []
  );

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setResponseError("");
        router.push("/");
      })
      .catch((error) => {
        console.log(error.message);
        setResponseError(error.message);
      });
  };

  if (user) {
    router.push("/");
  }

  return (
    <Container
      maxW="1200px"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column">
      <Heading as="h2">Welcome</Heading>
      <form
        style={{
          width: 350,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}>
        <FormControl p="4" isInvalid={!!emailErrors.length} errortext={emailErrors}>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" placeholder="Email" onChange={handleChangeEmail} />
          <FormErrorMessage>{emailErrors[0]}</FormErrorMessage>
        </FormControl>
        <FormControl px="4" pb="4" isInvalid={!!passwordErrors.length} errortext={passwordErrors}>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Password" name="password" onChange={handleChangePassword} />
          <FormErrorMessage>{passwordErrors[0]}</FormErrorMessage>
        </FormControl>
        <Text fontSize="md">
          Dont have a account ?{" "}
          <Link href="/sign-up">
            <Text as="span" cursor="pointer" color="#1a73e8">
              Create a account
            </Text>
          </Link>
        </Text>

        <Button
          type="submit"
          p="4"
          mx="4"
          mt="6"
          w="90%"
          cursor="pointer"
          colorScheme="blue"
          variant="solid"
          isDisabled={!!emailErrors.length || !!passwordErrors.length}>
          Login
        </Button>
        <FormControl w="280px" pb="4" isInvalid={!!(responseError !== "")} errortext={responseError}>
          <FormErrorMessage>{responseError}</FormErrorMessage>
        </FormControl>
      </form>
    </Container>
  );
};

export default Login;
