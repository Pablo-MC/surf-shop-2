import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth/auth-slice';
import adminSlice from './admin/admin-slice';
import cartSlice from './cart/cart-slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    admin: adminSlice.reducer,
    cart: cartSlice.reducer,
  }
});

export default store;