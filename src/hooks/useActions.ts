import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { cartActions } from "./../redux/store/cart/cart.slice";
import { orderActions } from "./../redux/store/order/order.slice";

const allActions = {
  ...cartActions,
  ...orderActions
}

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
