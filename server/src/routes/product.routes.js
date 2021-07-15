// Enrutador de Productos: definición de las rutas del servidor que estan relacionadas con los Productos.
import { Router } from 'express';

// Middlewares 
import { verifyToken, isAdmin } from '../middleware/auth';
import multer from '../middleware/multer';

// Controllers
import * as productCtrl from '../controllers/product.controller';

const router = Router();  // Router() retorna un objeto que nos permite definir rutas.

router.get('/', productCtrl.getProducts);
router.get('/:productId', productCtrl.getProductById);
router.get('/categories/:categoryId', productCtrl.getProductsByCategory);

router.post('/', [verifyToken, isAdmin, multer.single('image')], productCtrl.createProduct);

router.put('/:productId', [verifyToken, isAdmin], productCtrl.updateProductById);
router.put('/checkout/:productId', verifyToken, productCtrl.updateProductById);

router.delete('/:productId', [verifyToken, isAdmin], productCtrl.deleteProductById);

export default router;


/*

-> '/' hace referencia a la URL http://localhost:4000/api/product
-> '/:id' hace referencia a la URL http://localhost:4000/api/product/:id   -> :id   sintaxis que se usa para indicar que le vamos a pasar un id que todavia no sabemos.

-> Cada vez que se visiten las diferentes URLs a traves del protocolo http GET, POST, PUT o DELETE, se ejecutará la funcion correspondiente que esta implementada en el Controlador de Productos.

 */