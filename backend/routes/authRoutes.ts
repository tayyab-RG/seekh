import express from 'express';
const router = express.Router();
import { userSignup, userLogin, userLogout } from '../controllers/authController'

router.post('/signup', userSignup);

router.post('/login', userLogin);

router.post('/logout', userLogout);

export = router;