import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

type BlogCard = {
  title: string;
  imageLink: string;
};

const BlogCard = (props: BlogCard) => {
  return (
    <Box h="100%" w="100%" borderWidth="1px" borderRadius="lg" display="flex" flexDirection="column" overflow="hidden">
      <Box w="100%" h="70%" overflow="hidden">
        <Image h="100%" w="100%" objectFit="fill" src={props.imageLink} alt={props.title} />
      </Box>
      <Box h="30%">
        <Text noOfLines={2} overflow="hidden" margin="15px">
          {props.title}
        </Text>
      </Box>
    </Box>
  );
};

export default BlogCard;
