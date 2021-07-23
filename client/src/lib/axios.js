import axios from 'axios';

const clientAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})

export default clientAxios;

// OBS 1: En desarrollo, siempre que se envíe una solicitud al Backend, clienteAxios va a tener establecida una URL como base (entrada al servidor). En este caso el valor de la variable de entorno REACT_APP_BACKEND_URL será: http://localhost:4000 que se encuentra en el archivo .env.development.local.
// OBS 2: En producción, debemos registrar en el Hosting la variable de entorno REACT_APP_BACKEND_URL, la cual tomará el valor que se encuentra en el archivo .env.production.local