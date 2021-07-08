import { Router } from 'express';
import { verifyToken, isAdmin, categoryById } from '../middleware/auth';
import * as ctrl from '../controllers/category.controller';

const router = Router();

router.get('/', ctrl.getAllCategories);
router.get('/:categoryId', categoryById, ctrl.getCategory);

router.post('/', [verifyToken, isAdmin], ctrl.createCategory);

router.put('/:categoryId', [verifyToken, isAdmin, categoryById], ctrl.updateCategory);

router.delete('/:categoryId', [verifyToken, isAdmin, categoryById], ctrl.deleteCategory);

export default router;