import React from "react";
import { Box } from "@chakra-ui/react";

type HeaderProps = {
  children: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <Box
      as="header"
      bg="#3182ce"
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      h="80px"
      px="25"
      boxSizing="border-box">
      {children}
    </Box>
  );
};

export default Header;
