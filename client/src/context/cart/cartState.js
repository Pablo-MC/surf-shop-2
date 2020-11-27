import React, { useReducer } from 'react';

// Import Context and Reducer
import cartContext from './cartContext';
import cartReducer from './cartReducer';

import clientAxios from '../../config/axios';



const CartState = (props) => {

   const initialState = { 
      productsCart: [],
      totalPrice: 0  
   }
   
   
   // Create the state and dispatch (useReducer)
   const [state, dispatch] = useReducer(cartReducer, initialState);
   

   // Actions

   const addProduct = (product) => { 
      
      // Para no duplicar el producto en la lista, agrego el producto únicamente si no está en el carrito.
      if (!isAddedToCart(product._id)) {
         product.quantity = 1;
         product.total = product.price;
         
         dispatch({
            type: 'ADD_PRODUCT',
            payload: product
         }) 
      } 
   }               
   
   const deleteProduct = (product) => {    

      state.totalPrice -= product.total;

      dispatch({
         type: 'DELETE_PRODUCT',
         payload: product
      })
   }

   const deleteAllProducts = () => {  // Función Utilizada para cuando se realiza la compra. 

      state.productsCart.map(product => deleteProduct(product));
            
      dispatch({
         type: 'DELETE_ALL_PRODUCT'
      })
   }

   const increaseQuantity = (product) => {

      if (product.quantity < product.stock) {
         product.quantity++;
         product.total = product.price * product.quantity;

         dispatch({
            type: 'INCREASE_QUANTITY',
            payload: product
         })
      }
   }

   const decreaseQuantity = (product) => {

      if (product.quantity <= product.stock && product.quantity > 1) {
         product.quantity--;
         product.total = product.price * product.quantity;

         dispatch({
            type: 'DECREASE_QUANTITY',
            payload: product
         })
      }
   } 


   const makePurchase = async () => {  

      try {
         // Iterar cada producto del carrito: actualizar la cantidad de stock y vendidos (sold).
         for (let product of state.productsCart) {
            product.stock -= product.quantity;
            product.sold += product.quantity; 
            await clientAxios.put(`/api/product/checkout/${product._id}`, product);
         } 
         
         // Eliminar los productos de la lista del Carrito.
         deleteAllProducts();

      } catch (error) {
         console.log(error);   
      }
   }


   const isAddedToCart = (productId) => {
      return state.productsCart.filter(product => product._id === productId).length !== 0;  // [] or [{}, ...]
   }


   return (
      <cartContext.Provider
         value={{
            productsCart: state.productsCart,
            totalPrice: state.totalPrice,
            addProduct,
            deleteProduct,
            increaseQuantity,
            decreaseQuantity,
            deleteAllProducts,
            makePurchase
         }}
      >
         {props.children}
      </cartContext.Provider>
   );
}

export default CartState;