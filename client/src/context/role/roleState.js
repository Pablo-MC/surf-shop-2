import React, { useReducer } from 'react';

import roleContext from './roleContext';
import roleReducer from './roleReducer';

import clientAxios from '../../config/axios';


const RoleState = (props) => {

   const initialState = {
      user: null,
      users: [],
      product: null,
      products: [],
      category: null,
      categories: [],
      productsCategory: [],
      message: null
   }

   const [state, dispatch] = useReducer(roleReducer, initialState);


   const getUsers = async () => {
      try {
         const res = await clientAxios.get('/api/user/');

         dispatch({
            type: 'GET_USERS',
            payload: res.data
         })

      } catch (error) {
         console.log(error);
      }
   }

   const getUser = async (userId) => {
      try {
         const res = await clientAxios.get(`/api/user/${userId}`);

         // console.log(res);

         dispatch({
            type: 'GET_USER',
            payload: res.data
         })

      } catch (error) {
         console.log(error);
      }
   }

   const deleteUser = async (user) => {
      try {
         await clientAxios.delete(`/api/user/${user._id}`);

         dispatch({
            type: 'DELETE_USER'
         })

      } catch (error) {
         console.log(error.response.data.message);
      }
   }


   // Products
   const getProducts = async () => {
      try {
         const res = await clientAxios.get('/api/product');

         dispatch({
            type: 'GET_PRODUCTS',
            payload: res.data
         })

      } catch (error) {
         console.log(error);
      }
   }

   const getProduct = async (productId) => {
      try {
         const res = await clientAxios.get(`/api/product/${productId}`);

         dispatch({
            type: 'GET_PRODUCT',
            payload: res.data
         })

      } catch (error) {
         console.log(error);
      }
   }

   const createProduct = async (product) => {
      try {
         const res = await clientAxios.post('/api/product', product);

         console.log(res);

         // Actualizo la página (reseteo de formulario) si el producto es creado correctamente.
         setTimeout(() => {
            window.location.reload();
         }, 1000);

      } catch (error) {

         dispatch({
            type: 'IMAGE_TYPE_ERROR',
            payload: error.response.data.message  // Image type not allowed
         })

         // Después de 2 segundos limpiar la alerta
         setTimeout(() => {
            dispatch({
               type: 'HIDE_ALERT'
            })
         }, 2000);
      }
   }

   const editProduct = async (product) => {
      try {
         await clientAxios.put(`/api/product/${product._id}`, product);

      } catch (error) {
         console.log(error.response.data.message);
      }
   }

   const deleteProduct = async (product) => {
      try {
         await clientAxios.delete(`/api/product/${product._id}`);

         dispatch({
            type: 'DELETE_PRODUCT'
         });

      } catch (error) {
         console.log(error.response.data.message);
      }
   }

   const getProductsByCategory = async (categoryId) => {
      try {
         const res = await clientAxios.get(`/api/product/categories/${categoryId}`);

         if (res.data.length > 0) {
            dispatch({
               type: 'PRODUCTS_BY_CATEGORY',
               payload: res.data
            })
         } else {
            dispatch({
               type: 'EMPTY_CATEGORY',
               payload: 'Category without products'
            })
         }

      } catch (error) {
         console.log(error);
      }
   }


   // Categories
   const getCategories = async () => {
      try {
         const res = await clientAxios.get('/api/category');

         dispatch({
            type: 'GET_CATEGORIES',
            payload: res.data
         });

      } catch (error) {
         console.log(error);
      }
   }

   const createCategory = async (category) => {
      try {
         await clientAxios.post('/api/category', category);

         getCategories();

      } catch (error) {
         console.log(error.response.data.message);
      }
   }


   // Roles
   const changeRole = async (user) => {
      try {
         await clientAxios.put(`/api/user/${user._id}`, user);

         getUser(user._id);

      } catch (error) {
         console.log(error);
      }
   }



   return (
      <roleContext.Provider
         value={{
            user: state.user,
            users: state.users,
            product: state.product,
            products: state.products,
            category: state.category,
            categories: state.categories,
            productsCategory: state.productsCategory,
            message: state.message,
            getUsers,
            getUser,
            deleteUser,
            createProduct,
            getProducts,
            getProduct,
            editProduct,
            deleteProduct,
            createCategory,
            getCategories,
            changeRole,
            getProductsByCategory

         }}

      >
         {props.children}
      </roleContext.Provider>
   );
}

export default RoleState;