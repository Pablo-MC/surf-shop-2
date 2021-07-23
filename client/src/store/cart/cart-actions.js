import { cartActions } from './cart-slice';

import clientAxios from '../../lib/axios';

export const makePurchase = (productsCart) => {
  return async function (dispatch) {
    try {
      // Iterar cada producto del carrito: actualizar la cantidad de stock y vendidos (sold).
      for (const prodCart of productsCart) {
        const product = { ...prodCart }; // Copia del objeto.
        product.stock -= product.quantity;
        product.sold += product.quantity;
        await clientAxios.put(`/api/product/checkout/${product._id}`, product);
      }
      // Eliminar los productos de la lista del Carrito Y reestablecer el precio total a cero.
      dispatch(cartActions.removeAllProductsFromCart());
    } catch (error) {
      console.log('Entre acá!', error);
    }
  }
};

export const saveCartUser = (user, productsCart = []) => {
  return async function (dispatch) {
    try {
      const userUpdated = { ...user }
      userUpdated.cart = productsCart;
      await clientAxios.put(`/api/user/${user._id}`, userUpdated);
    } catch (error) {
      console.log('Error al guardar el carrito', error);
    }
  }
}
