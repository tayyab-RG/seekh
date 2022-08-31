import { NextFunction, Request, Response } from 'express';
import prisma from '../prisma';

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // check email format
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) return next("Provide Valid email");

    // check password requirements
    // Minimum eight and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password)) return next("Password not meet the requirements!");

    try {
        const updatedPerson = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                email: email,
                password: password
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })
        res.status(200).json({ success: true, data: updatedPerson });
    } catch (error) {
        next(error);
    }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (!id) next('User Id is required!');

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
        next(error);
    }
}