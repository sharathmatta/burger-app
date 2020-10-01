import * as actionTypes from "../actions/actionTypes";
import { addOrder } from "../actions/utility";

const initialstate = {
  orders: [],
  ordersLoading: false,
  purchasing: false,
  purchased: false,
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        purchasing: true,
      };

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        purchasing: false,
        orders: state.orders.concat(addOrder(action.id, action.orderData)),
        purchased: true,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        purchasing: false,
      };
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        ordersLoading: true,
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        ordersLoading: true,
      };
    case action.FETCH_ORDERS_FAIL:
      return {
        ...state,
        ordersLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
