import { createSlice } from '@reduxjs/toolkit';

// import clientAxios from '../../config/axios';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    productsCart: [],
    totalPrice: 0
  },
  reducers: {
    addProductToCart(state, action) {
      const newProduct = { ...action.payload };
      const existingProduct = state.productsCart.find(product => product._id === newProduct._id);
      if (!existingProduct) {
        newProduct.total = newProduct.price;
        newProduct.quantity = 1;
        state.productsCart.push(newProduct);
        state.totalPrice += newProduct.price;
      }
    },
    removeProductFromCart(state, action) {
      const deleteProduct = action.payload;
      state.totalPrice -= deleteProduct.total;
      state.productsCart = state.productsCart.filter(product => product._id !== deleteProduct._id);
    },
    removeAllProductsFromCart(state) {
      state.productsCart = [];
      state.totalPrice = 0;
    },
    increaseQuantity(state, action) {
      const prod = { ...action.payload };
      if (prod.quantity < prod.stock) {
        prod.quantity++;
        prod.total = prod.price * prod.quantity;

        state.productsCart = state.productsCart.map(product => product._id === prod._id ? prod : product);

        state.totalPrice = parseFloat(state.totalPrice + (state.productsCart.find(product => product._id === prod._id).price));
      }
    },
    decreaseQuantity(state, action) {
      const prod = { ...action.payload };

      if (prod.quantity <= prod.stock && prod.quantity > 1) {
        prod.quantity--;
        prod.total = prod.price * prod.quantity;

        state.productsCart = state.productsCart.map(product => product._id === prod._id ? prod : product);

        state.totalPrice = parseFloat(state.totalPrice - (state.productsCart.find(product => product._id === prod._id).price));
      }
    },
    getCartUser(state, action) {
      state.productsCart = action.payload.userCart;

      state.totalPrice = state.productsCart.reduce((acc, product) => acc + product.total, 0);

    }
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;


/////////////////////////////////////// Acciones Personalizadas. 
// Thunks: es una funcion que retorna una acción luego de que algo termina. Dicha función thunk en lugar de retornar inmediatamente una acción, lo que hace es retornar OTRA función que finalmente retorna la acción para que podamos ejecutar algún otro código (QUE SEA ASINCRONO, cualquier código que cause efectos secundarios) ANTES de retornar la acción (que tenemos dentro del campo reducer.). Tambien podemos colocar un dispatch ANTES del codigo asincrono. PEro TODOAS las acciones que esten DESPUES de un codigo asincrono, se ejecutaraán DESPUES de que el código asicrono finalice!. 😀  


// export const makePurchase = (productsCart) => {
//   return async function (dispatch) {
//     try {
//       // Iterar cada producto del carrito: actualizar la cantidad de stock y vendidos (sold).
//       console.log(productsCart);

//       for (const product of this.productsCart) {
//         // let p = { ...product };
//         product.stock -= product.quantity;
//         product.sold += product.quantity;
//         await clientAxios.put(`/api/product/checkout/${product._id}`, product);
//       }

//       console.log('PERFECTO!, LO GUARDÉ!');


//       // Eliminar los productos de la lista del Carrito Y reestablecer el precio total a cero.
//       dispatch(cartActions.removeAllProductsFromCart());
//     } catch (error) {
//       console.log('Entre acá!', error);
//     }
//   }
// };


