import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    token: localStorage.getItem('token'), // vacio === null
    registered: false,
    isAuthenticated: false,
    user: null,
    message: null,
  },
  reducers: {
    login(state, action) {
      localStorage.setItem('token', action.payload.token);
      state.isAuthenticated = true;
      // state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state) {
      localStorage.removeItem('token');
      state.isAuthenticated = false;
      // state.token = '';
      state.user = null;
    },
    notification(state, action) {
      state.message = action.payload.message;
    },
    registered(state, action) {
      state.registered = action.payload.registered;
    },
    getUser(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice;