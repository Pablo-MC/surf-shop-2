import { Router } from 'express';
import * as ctrl from '../controllers/user.controller';

const router = Router();

router.get('/', ctrl.getUsers);
router.get('/:userId', ctrl.getUserById);

router.put('/:userId', ctrl.updateUserById);

router.delete('/:userId', ctrl.deleteUserById);

export default router;