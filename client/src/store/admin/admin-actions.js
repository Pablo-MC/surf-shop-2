import { adminActions } from "./admin-slice";
// import { authActions } from "../auth/auth-slice";  // NO usar éste!, despues implementar ui-slice.

import clientAxios from "../../lib/axios";

// USERS

export const getAllUsers = () => {
  return async function (dispatch) {
    try {
      const res = await clientAxios.get('/api/user/');
      dispatch(adminActions.getUsers({ users: res.data }))
    } catch (error) {
      console.log(error);
    }
  }
}

export const updateUser = (user) => {
  return async function () {
    try {
      await clientAxios.put(`/api/user/${user._id}`, user);
    } catch (error) {
      console.log(error);
    }
  }
}

export const deleteUser = (user) => {
  return async function () {
    try {
      await clientAxios.delete(`/api/user/${user._id}`);
    } catch (error) {
      console.log(error);
    }
  }
}


// PRODUCTS

export const createProduct = (product) => {
  return async function (dispatch) {
    try {
      const res = await clientAxios.post('/api/product', product);
      console.log(res.data.message);
      // dispatch(authActions.notification({ message: res.data.message }));
      dispatch(getAllProducts());
    } catch (error) {
      console.log('Entre aca!', error.message);
    }
  }
}

export const getAllProducts = () => {
  return async function (dispatch) {
    try {
      const res = await clientAxios.get('/api/product');
      dispatch(adminActions.getProducts({ products: res.data }));
    } catch (error) {
      console.log(error);
    }
  }
}

export const updateProduct = (product) => {
  return async function (dispatch) {
    try {
      await clientAxios.put(`/api/product/${product._id}`, product);
      dispatch(getAllProducts());
    } catch (error) {
      console.log(error);
    }
  }
}

export const deleteProduct = (product) => {
  return async function (dispatch) {
    try {
      await clientAxios.delete(`/api/product/${product._id}`);
      dispatch(getAllProducts());
    } catch (error) {
      console.log(error);
    }
  }
}

// CATEGORIES

export const getAllCategories = () => {
  return async function (dispatch) {
    try {
      const res = await clientAxios.get('/api/category/');
      dispatch(adminActions.getCategories({ categories: res.data }));
    } catch (error) {
      console.log(error);
    }
  }
}

export const createCategory = (category) => {
  return async function (dispatch) {
    try {
      await clientAxios.post('/api/category', category);
      dispatch(getAllCategories());
    } catch (error) {
      console.log(error);
    }
  }
}