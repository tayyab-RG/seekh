import jwt from "jsonwebtoken";

export function getToken(userId: string) {
    return jwt.sign(
        { userId },
        `${process.env.TOKEN_KEY}`,
        {
            expiresIn: "1h"
        }
    );
}