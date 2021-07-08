import { Router } from 'express';
import { verifyToken } from '../middleware/auth';
import * as ctrl from '../controllers/auth.controller';

const router = Router();

router.get('/', verifyToken, ctrl.getAuthenticatedUser);

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);

export default router;