import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./../../../types";
import { loadCartState } from "./../../../helpers/helpers";

const initialState: Product[] = loadCartState();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      const indexToRemove = state.findIndex((product) => product.id === action.payload.id);
      if (indexToRemove !== -1) {
        state.splice(indexToRemove, 1);
      }
    },
    removeAllItems: (state, action: PayloadAction<{ id: number }>) => {
      return state.filter((product) => product.id !== action.payload.id);
    },
    clearCart: () => {
      return [];
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const cartActions = cartSlice.actions;

