import { Product } from "../types";

export const saveCartState = (state: Product[]) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cartState', serializedState);
  } catch(e) {
    console.error(e);
  }
};

export const loadCartState = (): Product[] => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch {
    return [];
  }
};
