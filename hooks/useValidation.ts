import React, { useState, useEffect } from "react";

type useValidattionProp = {
  value: string;
  schema: any;
};

const useValidation = (props: useValidattionProp) => {
  const [errors, setErrors] = useState<string[]>([]);
  useEffect(() => {
    props.schema
      .validate(props.value)
      .then((value) => {
        setErrors([]);
      })
      .catch(function (err) {
        setErrors(err.errors);
      });
  }, [props.value]);

  return errors;
};

export default useValidation;
