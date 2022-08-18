import { Request, Response } from 'express';
import dotenv from 'dotenv';
import prisma from '../prisma';

dotenv.config();

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            }
        });
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ msg: "Something Went wrong!" });
    }
}

export async function updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!name) return res.status(400).json({ success: false, msg: 'Name cannot be empty!' });
    if (!email) return res.status(400).json({ success: false, msg: 'Email cannot be empty!' });
    if (!password) return res.status(400).json({ success: false, msg: 'Password cannot be empty!' });

    try {
        const updatedPerson = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                email: email
            },
        })
        res.status(200).json({ success: true, data: updatedPerson });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: 'Something went wrong!' })
    }
}

export async function getUser(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) res.status(400).json({ msg: "Id is required!" });

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                name: true,
                email: true
            }
        });
        res.status(200).json({ data: user });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "User with given Id not found!" });
    }
}