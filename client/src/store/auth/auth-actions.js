import { authActions } from './auth-slice';
import { cartActions } from '../cart/cart-slice';

// Importar ClienteAxios para hacer las solicitudes al Backend.
import clientAxios from '../../lib/axios';
import tokenAuth from '../../lib/token';

export const registerUser = (newUser) => {
  return async function (dispatch) {
    try {
      const res = await clientAxios.post('/api/auth/register', newUser);
      dispatch(authActions.notification({ message: res.data.message })); // 'Successful registration! 😀'
    } catch (error) {
      dispatch(authActions.notification({ message: error.response.data.message })) // 'User already exists'
    }

    // Después de 2 segundos resetar el valor de message.
    setTimeout(() => {
      dispatch(authActions.notification({ message: null }))
    }, 2000);
  }
};

export const signIn = (user) => {
  return async function (dispatch) {
    try {
      const res = await clientAxios.post('/api/auth/login', user);

      // Almacenar el token generado por el Servidor en LocalStorage y establecer al usuario autenticado como verdadero.
      dispatch(authActions.login({ token: res.data.token }));
    } catch (error) {
      dispatch(authActions.notification({ message: error.response.data.message })); // The user not exist  ||  Invalid password

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
      // Enviar y almacenar en el HEADER del Servidor el token que esta almacenado en LocalSorage.
      tokenAuth();

      const res = await clientAxios.get('/api/auth');

      // Obtener todos los datos del usuario MENOS el password y establecer al usuario autenticado como verdadero.
      dispatch(authActions.getUser({ user: res.data.userAuth })); // El payload 'user' contiene: res.data.userAuth

      // obtengo el carrito del usuario!.
      dispatch(cartActions.getCartUser({ userCart: res.data.userAuth.cart }));
    } catch (error) {
      console.error(error.response.data.message);  // 'No token provided' || 'The token expired' || 'invalid token'

      // En caso de que el usuario no este correctamente autenticado (No tenga un Token | El token es inválido | El token haya expirado), ENTONCES eliminamos el token del localStorage, reiniciamos TODOS los valores del estado authSlice y desloguamos al usuario.
      dispatch(authActions.logout());
    }
  }
}