import express from 'express';
const router = express.Router();
import { userSignup, userLogin } from '../controllers/authController'

router.post('/signup', userSignup);

router.post('/login', userLogin);

export = router;