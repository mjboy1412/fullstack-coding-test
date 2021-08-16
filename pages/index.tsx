import { useRef } from "react";
import Head from "next/head";
import { Input, FormControl, FormLabel, FormErrorMessage, FormHelperText } from "@chakra-ui/react";
import { Container, Flex } from "@chakra-ui/layout";

import DynamicText from "../components/DynamicText";

const Home = () => {
  const dynamicTextRef = useRef(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    dynamicTextRef.current.changeValue(value);
  };

  return (
    <Container maxW="1200px">
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex as="main" w="100%" justifyContent="center" alignItems="center" flexDirection="column">
        <DynamicText ref={dynamicTextRef} />
        <FormControl width="500px" border="1px" borderColor="gray.200" padding="25px" borderRadius="15px">
          <FormLabel>Please enter the dynamic text in here</FormLabel>
          <Input type="text" placeholder="Type here" size="sm" onChange={handleChange} />
        </FormControl>
      </Flex>
    </Container>
  );
};

export default Home;
