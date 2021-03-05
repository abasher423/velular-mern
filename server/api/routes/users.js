import express from 'express';
import checkAuth from '../auth/check-auth.js';
import UsersController from '../controllers/users.js';

const router = express.Router();

router.get('/', checkAuth('manager'), UsersController.users_get_all);

router.get('/:userId', UsersController.users_get_user);

router.post('/signup', UsersController.user_signup);

router.post('/login', UsersController.user_login);

router.patch('/:userId', UsersController.users_update_user);

router.delete('/:userId', checkAuth('manager'), UsersController.users_delete_user);

export default router;