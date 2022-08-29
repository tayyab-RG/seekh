import express from 'express';
const router = express.Router();
import { userSignup, userLogin, userLogout } from '../controllers/authController'
import handleError from '../middlewares/errorMiddleware';

router.post('/signup', userSignup, handleError);

router.post('/login', userLogin, handleError);

router.post('/logout', userLogout);

export = router;