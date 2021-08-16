import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Heading } from "@chakra-ui/react";

const DynamicText = forwardRef((props, ref) => {
  const [value, setValue] = useState<string>("Random Text");

  useImperativeHandle(ref, () => ({
    changeValue: (value) => setValue(value),
  }));

  return (
    <Heading as="h1" maxWidth="70%" my="30px">
      {value}
    </Heading>
  );
});

export default DynamicText;
