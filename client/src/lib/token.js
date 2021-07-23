import clientAxios from './axios';

// Enviar y almacenar en el HEADER del Servidor el token que esta almacenado en LocalSorage en caso de que exista. 
// OBS: Header => KEY: x-auth-token | VALUE: token   
const tokenAuth = () => {
  const token = localStorage.getItem('token');  // token:  string => (true)  | vacio => null (false).

  if (token) {
    clientAxios.defaults.headers.common['x-auth-token'] = token;
  } else { // Para que se elimina sino hay nada?. Probar sacarlo. ###
    delete clientAxios.defaults.headers.common['x-auth-token'];
  }
}

export default tokenAuth;