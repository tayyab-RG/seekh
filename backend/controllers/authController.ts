import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { getToken } from '../utilities/getToken';
import prisma from '../prisma';

export async function userSignup(req: Request, res: Response) {
    let { name, email, password } = req.body;

    if (!name) return res.status(400).json('Name cannot be empty!');
    if (!email) return res.status(400).json('Email cannot be empty!');
    if (!password) return res.status(400).json('Password cannot be empty!');

    // check email format
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) return res.status(400).json("Provide Valid email");

    // check password requirements
    // Minimum eight and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password)) return res.status(400).json("Password not meet the requirements!");

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
            }
        })

        const token = getToken(user.id);
        res.cookie('jwt_token', token, { httpOnly: true, maxAge: 1000 * 3600 * 24 });
        res.status(201).json({ data: user, token: token })
    } catch (error) {
        res.status(500).json('Something went wrong!')
    }
}

export async function userLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ success: false, msg: 'Email cannot be empty!' });
    if (!password) return res.status(400).json({ success: false, msg: 'Password cannot be empty!' });

    const user = await prisma.user.findFirst({
        where: {
            email: email,
        }
    });

    if (!user) return res.status(400).json("Invalid Credentials!");

    if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = getToken(user.id);
        res.cookie('jwt_token', token, { httpOnly: true, maxAge: 1000 * 3600 * 24 });
        return res.status(200).json({ token: token, data: user });
    }

    res.status(400).json("Invalid Credentials!");
}

export function userLogout(req: Request, res: Response) {
    res.cookie('jwt_token', '', { httpOnly: true, maxAge: 1 });
    res.status(200).json("User Logged out!");
}