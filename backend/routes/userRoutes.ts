import express from 'express';
const router = express.Router();
import { updateUser, getUser } from '../controllers/userController'
import handleError from '../middlewares/errorMiddleware';

router.get('/user/:id', getUser, handleError);

router.put('/user/:id', updateUser, handleError);

export = router;