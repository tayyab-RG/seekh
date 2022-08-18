import express from 'express';
const router = express.Router();
import { getAllUsers, updateUser, getUser } from '../controllers/userController'

router.get('/users', getAllUsers);

router.get('/user/:id', getUser);

router.put('/user/:id', updateUser);

export = router;