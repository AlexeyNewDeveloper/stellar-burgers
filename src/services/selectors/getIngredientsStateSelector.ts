import { RootState } from "../types";
import { IGetIngredientsInitialState } from "../states/getIngredientsState";

export const getIngredientsState = (
  state: RootState
): IGetIngredientsInitialState => state.getIngredientsReducer;
