"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    console.log("verifying token");
    const token = req.cookies ? req.cookies.jwt_token : undefined;
    if (!token)
        return res.status(403).send("A token is required for authentication");
    try {
        jsonwebtoken_1.default.verify(token, `${process.env.TOKEN_KEY}`);
        // TODO: get user from unhashed userid and send to next step
        return next();
    }
    catch (err) {
        return res.status(401).send("Invalid Token");
    }
};
exports.default = verifyToken;
