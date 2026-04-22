import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import * as usersController from './users.controller';

const router = Router();

router.get('/', authenticate, authorize('admin'), usersController.getAllUsers);
router.put('/:userId', authenticate, usersController.updateUser);
router.delete('/:userId', authenticate, authorize('admin'), usersController.deleteUser);

export default router;
