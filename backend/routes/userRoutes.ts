import express from 'express';
const router = express.Router();
import { getAllUsers, updateUser, getUser } from '../controllers/userController'
import verifyToken from '../middlewares/authMiddleware'

router.get('/users', verifyToken, getAllUsers);

router.get('/user/:id', getUser);

router.put('/user/:id', updateUser);

export = router;