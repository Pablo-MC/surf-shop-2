require('dotenv').config();  // Importación de las variables de entorno.

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path'; // Permite obtener la ruta donde se encuentra un archivo determinado.

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import categoryRoutes from './routes/category.routes';

import { connectDB } from './database';

// Crear el Servidor
const app = express();

// Iniciar conexión con la Base de Datos
connectDB();

// Middlewares
app.use(cors());  // Permite enviar y recibir datos entre el Servidor y el Cliente.
app.use(morgan('dev'));  // Permite ver en la terminal las peticiones que llegan desde el Cliente.
app.use(express.json());  // Permite al servidor interpretar los formatos json que llegan desde el cliente (req.body)
app.use(express.urlencoded({ extended: false }));  // Permite al servidor interpretar datos enviados a traves de formularios. 

// Routes (Definición de las rutas del Servidor) - REST API
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/category', categoryRoutes);

// Carpeta pública de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Establecer el número de puerto al cual se va a conectar el servidor. (!== al puerto del cliente). 
// OBS: En producción el número de puerto será establecido por el hosting en el valor env.PORT
app.set('port', process.env.PORT || 4000);

// Iniciar Servidor
app.listen(app.get('port'), () => {
   console.log(`Server listening on port ${app.get('port')}`);
});