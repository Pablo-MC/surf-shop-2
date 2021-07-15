// Cada vez que se envie una petición al servidor podemos utilizar dichas funciones (middlewares) en determinadas rutas para protejerlas y realizar validaciones ANTES de ejecutar la función del controlador. 

import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import User from '../models/User';
import Category from '../models/Category';

export const verifyToken = async function (req, res, next) {
  try {
    // Verificar si existe un token almacenado en el campo 'x-auth-token' dentro del HEADER de la solicitud del Cliente.
    const token = req.header('x-auth-token');  // console.log(token); 
    if (!token) return res.status(403).json({ message: 'No token provided!' });

    // Verificar si el token es válido. Si es valido nos retorna un objeto donde se encuentra almacenado el id del usuario ej: { id: '5f61810cb394ef082828a7e3', iat: 1600225548, exp: 1600311948 }. De lo contrario entra al catch y retorna el mensaje: 'jwt expired' || 'invalid token'. 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // console.log(decoded);

    // Verificar si existe un usuario con dicho id  (Por si se eliminó el usuario y el token se mantuvo).
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Crear el campo (KEY) 'userId' dentro del HEADER de la solicitud del Cliente y asignarle como VALUE el id del usuario, para poder usar dicho campo en el siguiente middleware o en la función del controlador.
    req.userId = decoded.id;

    next();  // next() continúa con el siguiente middleware o función de un controlador.
  } catch (error) {
    res.status(500).json({ message: error.message });  // 'jwt expired'  ||  'invalid token' || 'No token provided!'
    // res.status(500).json({ message: 'Unauthorized' });
  }
}

export const isAdmin = async function (req, res, next) {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== 'admin') return res.status(403).json({ message: 'Require Admin role' });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const categoryById = async function (req, res, next) {
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