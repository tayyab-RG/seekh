import express from 'express';
const router = express.Router();
import { createUser, getAllUsers, deleteUser, updateUser, getUser } from '../controllers/user'

router.post('/user/create', createUser);

router.get('/users', getAllUsers);

router.get('/user/:id', getUser);

router.delete('/user/:id', deleteUser);

router.put('/user/:id', updateUser);

export = router;