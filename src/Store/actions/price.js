import * as actionTypes from "./actionTypes";

export const increasePrice = (name) => {
  return {
    type: actionTypes.INCREASE_PRICE,
    ingredientName: name,
  };
};
export const decreasePrice = (name) => {
  return {
    type: actionTypes.DECREASE_PRICE,
    ingredientName: name,
  };
};
