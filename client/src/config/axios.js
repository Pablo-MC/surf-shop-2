// El modulo axios se utiliza para enviar las solicitudes hacia el Backend.
import axios from 'axios';

const clientAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})

export default clientAxios;

// OBS: De esta forma siempre que se envíe una solicitud al Backend, clienteAxios va a tener establecida una URL como base (entrada al servidor). Luego cuando registremos la variable de entorno en producción, solamente debemos registrar la variable REACT_APP_BACKEND_URL.
