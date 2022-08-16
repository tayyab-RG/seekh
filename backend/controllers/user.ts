import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';
import { Express, Request, Response } from 'express';

const prisma = new PrismaClient()

export async function createUser(req: Request, res: Response) {
    let { name, email, password } = req.body;

    if (!name) return res.status(400).json({ success: false, msg: 'Name cannot be empty!' });
    if (!email) return res.status(400).json({ success: false, msg: 'Email cannot be empty!' });
    if (!password) return res.status(400).json({ success: false, msg: 'Password cannot be empty!' });

    // Check if email already exists
    const oldUser = await prisma.user.findFirst({
        where: {
            email: email,
        }
    });

    if (oldUser) {
        return res.status(409).send("User Already Exist!");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: encryptedPassword
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true
            }
        })
        res.status(201).json({ success: true, msg: "User added.", data: user })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Something went wrong!' })
    }
}

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({ data: users });
    } catch (err) {
        res.status(500).json({ msg: "Something Went wrong!" });
    }
}

export async function deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) res.status(400).json({ msg: "Id is required!" });

    try {
        let updatedPerson = await prisma.user.delete({
            where: {
                id: id,
            },
        })
        res.status(200).json({ success: true, data: updatedPerson });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: 'Something went wrong!' })
    }
}

export async function updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!name) return res.status(400).json({ success: false, msg: 'Name cannot be empty!' });
    if (!email) return res.status(400).json({ success: false, msg: 'Email cannot be empty!' });
    if (!password) return res.status(400).json({ success: false, msg: 'Password cannot be empty!' });

    try {
        let updatedPerson = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                email: email,
                password: password
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
        });
        res.status(200).json({ data: user });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "User with given Id not found!" });
    }
}