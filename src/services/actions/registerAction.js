import { URL_FOR_GET_DATA } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";

export const REGISTRATION = "REGISTRATION";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";

export function getIngredientsAction() {
  return function (dispatch) {
    dispatch({
      type: REGISTRATION,
    });
    fetch(`${URL_FOR_GET_DATA}/ingredients`)
      .then(checkResponse)
      .then((res) => {
        dispatch({
          type: REGISTRATION_SUCCESS,
          ingredients: res.data,
        });
      })
      .catch((err) => {
        dispatch({ type: REGISTRATION_FAILED });
      });
  };
}
