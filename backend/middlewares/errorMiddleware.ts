import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

const handleError = async (err: Prisma.PrismaClientKnownRequestError | string, req: Request, res: Response, next: NextFunction) => {

    let errorCode;
    if (typeof (err) === 'string') {
        switch (true) {
            case /empty|required|Empty|Required/.test(err):
                errorCode = 400;
                break;
            case (err === 'Unauthorized!'):
                errorCode = 401;
                break;
            case (err == 'Provide Valid email'
                || err == 'Cannot enroll in your own course.'
                || err == 'Password not meet the requirements!'
                || err == 'User Already Exist!'
                || err == 'Invalid Credentials!'
                || err == 'A token is required for authentication'
            ):
                errorCode = 403;
                break;
            case /found|Found/.test(err):
                errorCode = 404;
                break;
            case /invalid|Invalid/.test(err):
                errorCode = 405;
                break;
            default:
                errorCode = 500;
                err = "Something went Wrong!"
                break;
        }
        return res.status(errorCode).json({
            errorCode: errorCode,
            msg: err
        });
    }

    let responseMsg;
    switch (err.code) {
        case 'P2002':
            responseMsg = `${err.message.split('\n')[8].trim().split(' ')[-1]} already exists. Please try another one.`;
            errorCode = 403;
        case 'P2025':
            responseMsg = 'Record Not found!';
            errorCode = 404;
            break;
        default:
            responseMsg = "Something Went Wrong!"
            errorCode = 500;
            break;
    }
    return res.status(errorCode).json({
        errorCode: errorCode,
        msg: responseMsg
    });
}

export default handleError