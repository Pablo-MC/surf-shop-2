import { Router } from 'express';
import * as userCtrl from '../controllers/user.controller';

const router = Router();

router.get('/', userCtrl.getUsers);

router.get('/:userId', userCtrl.getUserById);
router.put('/:userId', userCtrl.updateUserById);
router.delete('/:userId', userCtrl.deleteUserById);

// Alternative
// router.route('/:userId')
//   .get(userCtrl.getUserById)
//   .put(userCtrl.updateUserById)
//   .delete(userCtrl.deleteUserById)

export default router;