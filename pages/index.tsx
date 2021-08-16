import Head from "next/head";
import { Input } from "@chakra-ui/react"
import { Container, Box } from "@chakra-ui/layout";

import DynamicText from "../components/DynamicText";

const Home = () => {

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  return (
    <Container >
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main" w="100%">
        <DynamicText />
        <Input
          placeholder="Type here"
          size="sm"
        />
      </Box>
    </Container>
  );
};

export default Home;
