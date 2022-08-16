import express from 'express';
const router = express.Router();
import { createUser, getAllUsers, deleteUser, updateUser } from '../controllers/user'

router.post('/user/create', async (req, res) => {
    let { name, email } = req.body;

    if (!name) return res.status(400).json({ success: false, msg: 'Name cannot be emoty!' });
    if (!email) return res.status(400).json({ success: false, msg: 'Email cannot be emoty!' });

    try {
        const user = await createUser(name, email);
        res.status(201).json({ success: true, msg: "person added.", data: user })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Something went wrong!' })
    }
});

router.get('/users', async (req, res) => {
    const users = await getAllUsers();
    res.status(200).json({ data: users });
});

router.delete('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        let updatedPerson = await deleteUser(id);
        res.status(200).json({ success: true, data: updatedPerson });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: 'Something went wrong!' })
    }
});

router.put('/user/:id', async (req, res) => {
    const { name, email } = req.body;
    if (!name) return res.status(400).json({ success: false, msg: 'Name cannot be emoty!' });
    if (!email) return res.status(400).json({ success: false, msg: 'Email cannot be emoty!' });

    const { id } = req.params;
    try {
        let updatedPerson = await updateUser(id, name, email);
        res.status(200).json({ success: true, data: updatedPerson });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: 'Something went wrong!' })
    }
});

export = router;