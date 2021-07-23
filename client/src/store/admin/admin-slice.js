import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: 'administrator',
  initialState: {
    users: [],
    products: [],
    categories: [],
  },
  reducers: {
    getUsers(state, action) {
      state.users = action.payload.users;
    },
    getProducts(state, action) {
      state.products = action.payload.products;
    },
    getCategories(state, action) {
      state.categories = action.payload.categories;
    }

  }
});

export const adminActions = adminSlice.actions;

export default adminSlice;