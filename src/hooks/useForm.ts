import React from "react";
import { IFormInputs } from "../types";

interface IUseForm {
  values: IFormInputs;
  changed: boolean;
  handleChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setValues: React.Dispatch<React.SetStateAction<IFormInputs>>;
  setChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useForm(inputValues: IFormInputs): IUseForm {
  const [values, setValues] = React.useState<IFormInputs>(inputValues);
  const [changed, setChanged] = React.useState<boolean>(false);

  const handleChange = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (!changed) {
      setChanged(true);
    }
    const { value, name } = event.target as HTMLButtonElement;
    setValues({ ...values, [name]: { changed: true, value } });
  };
  return { values, changed, handleChange, setValues, setChanged };
}
