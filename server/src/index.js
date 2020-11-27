require('dotenv').config();  // Importación de las variables de entorno.

const express = require('express');
const { connectDB } = require('./database'); 
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');  // Permite obtener la ruta donde se encuentra un archivo determinado.


// Creación del Servidor
const app = express(); 

// Iniciar conexión con la Base de Datos
connectDB();

// Middlewares
app.use(cors());  // permite enviar y recibir datos entre el Servidor y el Cliente.
app.use(morgan('dev'));  // permite ver por consola las peticiónes que llegan desde el Cliente.
app.use(express.json());  // permite al servidor interpretar formatos json.
app.use(express.urlencoded({ extended: false }));  // permite al servidor interpretar datos enviados a traves de formularios. 

// Routes (Definición de las rutas del Servidor) - REST API
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/product', require('./routes/product.routes'));   
app.use('/api/category', require('./routes/category.routes'));   

// Carpeta pública de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Establecer el número de puerto al cual se va a conectar el servidor. (!== al puerto del cliente). 
// OBS: En producción el número de puerto será establecido por el hosting en el valor env.PORT
app.set('port', process.env.PORT || 4000); 

// Iniciar Servidor
app.listen(app.get('port'), () => {
   console.log(`Server listening on port ${app.get('port')}`);
});