import { authActions } from './auth-slice';

// Importar ClienteAxios para hacer las peticiones al Backend.
import clientAxios from '../config/axios';
import tokenAuth from '../config/token';

export const registerUser = (newUser) => {
  return async function (dispatch) {
    try {
      const res = await clientAxios.post('/api/auth/register', newUser);
      dispatch(authActions.registered({ registered: true }));
      dispatch(authActions.notification({ message: res.data.message }));
    } catch (error) {
      dispatch(authActions.notification({ message: error.response.data.message })) // User already exists
    }

    // Después de 2 segundos resetar los valores de message y registered.
    setTimeout(() => {
      dispatch(authActions.notification({ message: null }))
      dispatch(authActions.registered({ registered: false }))
    }, 2000);
  }
};

export const signIn = (user) => {
  return async function (dispatch) {
    try {
      const res = await clientAxios.post('/api/auth/login', user);
      dispatch(
        authActions.login({
          token: res.data.token,
          user: res.data.user,
        })
      )
    } catch (error) {
      dispatch(
        authActions.notification({
          message: error.response.data.message,  // The user not exist  ||  Invalid password
        })
      )
      // Después de 2 segundos limpiar la notificación
      setTimeout(() => {
        dispatch(authActions.notification({ message: null }))
      }, 2000);
    }
  }
};

export const getAuthenticatedUser = () => {
  return async function (dispatch) {
    try {
      // Enviar el token al Backend. 
      tokenAuth();

      const res = await clientAxios.get('/api/auth');

      console.log(res.data);
      dispatch(authActions.getUser({
        user: res.data  // res.data.userAuth contiene TODOS los datos del usuario menos el password.
      }))

    } catch (error) {
      console.log(error.response.data.message);  // 'No token provided' || 'The token expired'

      // En caso de que el usuario no este autenticado (Token Expirado), entonces eliminamos el token del localStorage y recetaemos TODOS los valores del initialState.
      dispatch(authActions.logout())
    }
  }
}