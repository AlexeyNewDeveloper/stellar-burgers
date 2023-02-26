import React from "react";
import { IFormInputs, IFormInputsProfile } from "../types";

interface IUseForm<T> {
  values: T;
  changed: boolean;
  handleChange: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  setChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useForm<T>(inputValues: T): IUseForm<T> {
  const [values, setValues] = React.useState<T>(inputValues);
  const [changed, setChanged] = React.useState<boolean>(false);

  const handleChange = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (!changed) {
      setChanged(true);
    }
    const { value, name } = event.target as HTMLButtonElement;
    setValues({ ...values, [name]: { changed: true, value } });
  };
  return { values, changed, handleChange, setValues, setChanged };
}
