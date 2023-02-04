import React from "react";

export function useForm(inputValues) {
  const [values, setValues] = React.useState(inputValues);
  const [changed, setChanged] = React.useState(false);

  const handleChange = (event) => {
    if (!changed) {
      setChanged(true);
    }
    const { value, name } = event.target;
    setValues({ ...values, [name]: { changed: true, value } });
  };
  return { values, changed, handleChange, setValues, setChanged };
}
