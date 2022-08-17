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

export function cookieParser(cookieString: string | undefined) {
    if (!cookieString) return {};

    let cookies = cookieString.split(';');
    cookies = cookies.map((elem) => {
        return elem.trim();
    });
    let obj: { [x: string]: string; } = {};
    cookies.forEach((elem: string) => {
        let [key, value] = elem.split('=');
        obj[key] = value;
    });
    return obj;
}