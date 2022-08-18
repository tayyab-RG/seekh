import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { cookieParser } from '../utilities/cookieParser';
import prisma from '../prisma';

dotenv.config();

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const cookies = cookieParser(req.headers.cookie);
    const token = cookies.jwt_token;

    if (!token)
        return res.status(403).send("A token is required for authentication");

    try {
        let decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
        if (typeof (decodedToken) === "object") {
            const userId = decodedToken.userId;
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (user) {
                res.locals.signedInUser = user;
                return next();
            }
        }
        throw new Error();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};

export default verifyToken;