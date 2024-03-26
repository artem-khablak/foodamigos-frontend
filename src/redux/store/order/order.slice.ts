import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from './../../../types';

interface OrderState {
  orderInfo: Order | null;
}

const initialState: OrderState = {
  orderInfo: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderInfo(state, action: PayloadAction<Order>) {
      state.orderInfo = action.payload;
    },
  },
});

export const orderReducer = orderSlice.reducer;

export const orderActions = orderSlice.actions;
