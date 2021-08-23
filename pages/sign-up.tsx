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

export default function () {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [ReconfirmPassword, setReconfirmPassword] = useState<string>("");
  const [responseError, setResponseError] = useState<string>("");
  const { user, setUser } = useContext(AuthContext);

  const router = useRouter();
  const emailErrors = useValidation({ value: email, schema: emailSchema });
  const passwordErrors = useValidation({ value: password, schema: passwordSchema });
  const reconfirmPasswordError = password === ReconfirmPassword ? null : "re-confirm is not match.";

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

  const handleChangeReconfirmPassword = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>): void => {
      event.preventDefault();
      const { value } = event.target;
      setReconfirmPassword(value);
    }, 500),
    []
  );

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
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
      <Heading as="h2">Create new account</Heading>
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
        <FormControl px="4" pb="4" isInvalid={!!reconfirmPasswordError} errortext={reconfirmPasswordError}>
          <FormLabel>Re-confirm password</FormLabel>
          <Input type="password" placeholder="Password" name="password" onChange={handleChangeReconfirmPassword} />
          <FormErrorMessage>{reconfirmPasswordError}</FormErrorMessage>
        </FormControl>

        <Text fontSize="md">
          Already have a account ?{" "}
          <Link href="/login">
            <Text as="span" cursor="pointer" color="#1a73e8">
              Sign in here
            </Text>
          </Link>
        </Text>
        <Button
          type="submit"
          p="4"
          mx="4"
          mt="6"
          w="90%"
          colorScheme="blue"
          variant="solid"
          isDisabled={!!emailErrors.length || !!passwordErrors.length || !!reconfirmPasswordError}>
          Sign up
        </Button>
        <FormControl w="280px" pb="4" isInvalid={!!(responseError !== "")} errortext={responseError}>
          <FormErrorMessage>{responseError}</FormErrorMessage>
        </FormControl>
      </form>
    </Container>
  );
}
