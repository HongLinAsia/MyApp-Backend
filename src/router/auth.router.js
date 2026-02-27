import express from 'express';
import { login, register, getUserInfo, updateUserInfo } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/user-info', getUserInfo)
router.post('/update-user-info', updateUserInfo)

export default router;