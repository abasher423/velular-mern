import express from 'express';
import checkAuth from '../auth/check-auth.js';
import checkRole from '../auth/check-role.js';
import UsersController from '../controllers/users.js';

const router = express.Router();

router.get('/', UsersController.users_get_all);

router.get('/:userId', checkAuth(), UsersController.users_get_user);

router.get('/:userId/admin-fetch', checkAuth(), checkRole('admin'), UsersController.admin_get_user);

router.post('/register', UsersController.user_register);

router.post('/login', UsersController.user_login);

router.patch('/:userId', checkAuth(), UsersController.users_update_user);

router.patch('/:userId/admin-update', UsersController.admin_update_user);

router.delete('/:userId', checkRole('admin'), UsersController.users_delete_user);

export default router;