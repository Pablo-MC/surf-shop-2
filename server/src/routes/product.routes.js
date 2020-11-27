// Enrutador de Productos: definición de las rutas del servidor que estan relacionadas con los Productos.
 
const express = require('express');
const router = express.Router();  // Router() retorna un objeto que nos permite definir rutas.

// Middlewares 
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const multer = require('../middleware/multer');

const { 
   getAllProducts,
   getProduct,
   getProductsCategory,
   createProduct, 
   updateProduct, 
   deleteProduct
} = require('../controllers/product.controller');


router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.get('/categories/:id', getProductsCategory);

router.post('/', [isAuthenticated, isAdmin, multer.single('image')], createProduct);

router.put('/:id', [isAuthenticated, isAdmin], updateProduct);  // Actualización de un producto realizada por un Administrador
router.put('/checkout/:id', isAuthenticated, updateProduct);  // Actualización de un producto cuando el usuario realiza una compra.

router.delete('/:id', [isAuthenticated, isAdmin], deleteProduct);


module.exports = router;


/* 

OBS:

-> '/' hace referencia a la URL http://localhost:4000/api/product
-> '/:id' hace referencia a la URL http://localhost:4000/api/product/:id   -> :id   sintaxis que se usa para indicar que le vamos a pasar un id que todavia no sabemos.

-> Cada vez que se visiten las diferentes URLs a traves del protocolo http GET, POST, PUT o DELETE, se ejecutará la funcion correspondiente que esta implementada en el Controlador de Productos.

 */