import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    isAuthenticated: false,
    user: null,
    message: null,
  },
  reducers: {
    login(state, action) {
      localStorage.setItem('token', action.payload.token);
      state.isAuthenticated = true;
    },
    logout(state) {
      localStorage.removeItem('token');
      state.isAuthenticated = false;
      state.user = null;
    },
    getUser(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    notification(state, action) {
      state.message = action.payload.message;
    },
  }
});

export const authActions = authSlice.actions;

export default authSlice;