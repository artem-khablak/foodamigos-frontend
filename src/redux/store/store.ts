import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./products/products.api";
import { cartReducer} from "./cart/cart.slice";
import { orderReducer } from "./order/order.slice";
import { loadCartState, saveCartState } from "./../../helpers/helpers";

const preloadedState = {
  cart: loadCartState(),
};

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
  devTools: true,
  preloadedState: preloadedState,
});

store.subscribe(() => {
  saveCartState(store.getState().cart);
});

export type TypeRootState = ReturnType<typeof store.getState>;
