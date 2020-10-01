import * as actionTypes from "../actions/actionTypes";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
  price: 4,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_PRICE:
      return {
        ...state,
        price: 4,
      };
    case actionTypes.INCREASE_PRICE:
      return {
        price: state.price + INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.DECREASE_PRICE:
      return {
        price: state.price + INGREDIENT_PRICES[action.ingredientName],
      };
    default:
      return state;
  }
};

export default reducer;
