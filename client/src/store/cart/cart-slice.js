import { createSlice } from '@reduxjs/toolkit';

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