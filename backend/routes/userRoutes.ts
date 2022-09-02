import express from 'express';
const router = express.Router();
import { updateUser, getUser } from '../controllers/userController'
import verifyToken from '../middlewares/authMiddleware';
import handleError from '../middlewares/errorMiddleware';

router.get('/user/:id', verifyToken, getUser, handleError);

router.put('/user/:id', verifyToken, updateUser, handleError);

export = router;