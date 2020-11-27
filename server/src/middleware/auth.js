// Cada vez que se envie una petición al servidor podemos utilizar dichas funciones (middlewares) en las rutas que queramos para realizar validaciones antes de ejecutar la función del controlador.

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/User');
const Category = require('../models/Category');
// const Product = require('../models/Product'); 


// Verificar si un token existe, es valido o expiró. 
exports.isAuthenticated = async (req, res, next) => {

   try {
      // Verificar si existe un token almacenado en el HEADER (key: 'x-auth-token')
      const token = req.header('x-auth-token');  // console.log(token);  
      if (!token) return res.status(403).json({ message: 'No token provided!' });

      // Verificar si el token es válido: verify() decodifica y verifica si el valor del token almacenado en 'x-auth-token' machea con el valor de JWT_SECRET. Si machea retorna un objeto donde se encuentra almacenado el id del usuario (dato) { id: '5f61810cb394ef082828a7e3', iat: 1600225548, exp: 1600311948 } . De lo contrario entra al catch y retorna el mensaje: 'jwt expired' || 'invalid token'.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // console.log(decoded);

      // Asignar a la request (req) el id del usuario en una nueva propiedad llamada userId para poder ser utilizada en el siguiente middleware o en la siguiente función de un controlador.
      req.userId = decoded.id;

      // Verificar si existe un usuario con dicho id  (Por si se eliminó el usuario y el token se mantuvo). OBS: Esto no es necesario si del lado del cliente se elimina el Token cuando un usuario se da de baja.
      const user = await User.findById(req.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      next();  // next() continúa con el siguiente middleware ó función de un controlador.

   } catch (error) {
      res.status(500).json({ message: error.message });  // 'jwt expired'  ||  'invalid token'
   }
}


exports.isAdmin = async (req, res, next) => {

   try {
      const user = await User.findById(req.userId);

      if (user.roles !== 'admin') return res.status(403).json({ message: 'Require Admin role' });

      next();

   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}


exports.categoryById = async (req, res, next) => {

   try {
      const { categoryId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(categoryId)) return res.status(403).json({ message: 'Category not found' });

      let catergory = await Category.findById(categoryId);

      if (!category) return res.status(403).json({ message: 'Category not found' });

      req.category = catergory;
      
      next();

   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}