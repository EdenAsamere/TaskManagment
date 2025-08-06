import { Router } from 'express';
import { getAllUsers, login, register } from '../controllers/auth.controller';
import { refreshToken } from '../controllers/refresh.controller';

const router = Router();

router.post('/login', login);
router.post('/register',register)
router.post('/refresh', refreshToken);
router.get('/users', getAllUsers);


export default router;
