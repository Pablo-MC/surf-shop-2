import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    productsCart: [],
    totalPrice: 0
  },
  reducers: {
    addItemToCart(state, action) {
      // if ()
      state.productsCart.push(action.payload.product);
    }

  }
});

export const cartActions = cartSlice.actions;

export default cartSlice;