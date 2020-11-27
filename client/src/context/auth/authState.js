import React, { useReducer } from 'react';

// Importar Context y Reducer
import authContext from './authContext';
import authReducer from './authReducer';

// Importar ClienteAxios para hacer las peticiones al Backend.
import clientAxios from '../../config/axios';

import tokenAuth from '../../config/token';


const AuthState = (props) => {

   const initialState = {
      token: localStorage.getItem('token'), // Para que lo almaceno en el state?  vacio === null.
      registered: null,
      authenticated: null,
      user: null,
      message: null
   }


   const [state, dispatch] = useReducer(authReducer, initialState);


   const registerUser = async (newUser) => {

      try {
         await clientAxios.post('/api/auth/register', newUser);

         dispatch({
            type: 'REGISTER_SUCCESS'
         })

      } catch (error) {
         console.log(error.response.data.message);

         dispatch({
            type: 'REGISTER_FAIL',
            payload: error.response.data.message  // User already exists
         })

         // Después de 2 segundos limpiar la alerta
         setTimeout(() => {
            dispatch({
               type: 'HIDE_ALERT'
            })
         }, 2000);
      }
   }


   const signIn = async (user) => {

      try {
         const res = await clientAxios.post('/api/auth/login', user);

         dispatch({
            type: 'LOGIN_SUCCESS',
            payload: res.data.token
         })

         getAuthenticatedUser();       

      } catch (error) {
         console.log(error.response.data.message);

         dispatch({
            type: 'LOGIN_FAIL',
            payload: error.response.data.message  // The user not exist  ||  Invalid password
         })

         // Después de 2 segundos limpiar la alerta
         setTimeout(() => {
            dispatch({
               type: 'HIDE_ALERT'
            })
         }, 2000);
      }
   }


   const logOut = () => {

      dispatch({
         type: 'LOGOUT'  // Eliminar el token del localStorage y recetar TODOS los valores del initialState.
      })
   }


   const getAuthenticatedUser = async () => {

      try {
         // Enviar el token al Backend. 
         tokenAuth();

         const res = await clientAxios.get('/api/auth');

         dispatch({
            type: 'GET_USER',
            payload: res.data  // res.data contiene TODOS los datos del usuario menos el password.
         })

      } catch (error) {
         console.log(error.response.data.message);  // 'No token provided' || 'The token expired'

         dispatch({
            type: 'LOGOUT'  // En caso de que el usuario no este autenticado (Token Expirado), entonces eliminamos el token del localStorage y recetaemos TODOS los valores del initialState.
            // payload: error.response.data.message
         })
      }
   }


   return (
      <authContext.Provider
         value={{
            token: state.token,
            registered: state.registered,
            authenticated: state.authenticated,
            user: state.user,
            message: state.message,
            registerUser,
            signIn,
            logOut,
            getAuthenticatedUser

         }}
      >
         {props.children}
      </authContext.Provider>

   );
}

export default AuthState;