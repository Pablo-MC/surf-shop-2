import 'dotenv/config'; // Importación de las variables de entorno.

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path'; // Permite obtener la ruta donde se encuentra un archivo determinado.

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import categoryRoutes from './routes/category.routes';
// import cartRoutes from './routes/cart.routes';

import { connectDB } from './database';

// Crear el Servidor
const app = express();

// Iniciar conexión con la Base de Datos
connectDB();

// Middlewares
app.use(cors());  // Permite enviar y recibir datos entre el Servidor y el Cliente.
app.use(morgan('dev'));  // Permite ver en la terminal las solicitudes que llegan desde el Cliente.
app.use(express.json());  // Permite al servidor interpretar los formatos json que llegan desde el Cliente (req.body).
app.use(express.urlencoded({ extended: true }));  // Permite al servidor interpretar datos enviados a traves de formularios.
app.use(express.static(path.join(__dirname, 'public'))); // Carpeta pública de archivos estáticos.

// Routes (Definir las rutas del Servidor) - REST API
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/category', categoryRoutes);
// app.use('/api/cart', cartRoutes);

// Establecer el número de puerto del Servidor al que deberán llegar las solicitudes del Cliente.  
// . En desarrollo será 4000 (http://localhost:4000) . OBS: Debe ser !== al número de puerto del Cliente.
// . En producción será establecido por el hosting en el valor PORT
app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => {
   console.log(`Server listening on port ${app.get('port')}`);
});

// app.get('/', (req, res) => res.json({ message: 'Hello World' }));