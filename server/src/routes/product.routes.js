// Enrutador de Productos: definición de las rutas del servidor que estan relacionadas con los Productos.
import { Router } from 'express';

// Middlewares 
import { verifyToken, isAdmin } from '../middleware/auth';
import multer from '../middleware/multer';

// Controllers
import * as ctrl from '../controllers/product.controller';

const router = Router();  // Router() retorna un objeto que nos permite definir rutas.

router.get('/', ctrl.getProducts);
router.get('/:productId', ctrl.getProductById);
router.get('/categories/:categoryId', ctrl.getProductsByCategory);

router.post('/', [verifyToken, isAdmin, multer.single('image')], ctrl.createProduct);

router.put('/:productId', [verifyToken, isAdmin], ctrl.updateProductById);
router.put('/checkout/:productId', verifyToken, ctrl.updateProductById);

router.delete('/:productId', [verifyToken, isAdmin], ctrl.deleteProductById);

export default router;


/*

-> '/' hace referencia a la URL http://localhost:4000/api/product
-> '/:id' hace referencia a la URL http://localhost:4000/api/product/:id   -> :id   sintaxis que se usa para indicar que le vamos a pasar un id que todavia no sabemos.

-> Cada vez que se visiten las diferentes URLs a traves del protocolo http GET, POST, PUT o DELETE, se ejecutará la funcion correspondiente que esta implementada en el Controlador de Productos.

 */