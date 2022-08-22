"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookieParser_1 = require("../utilities/cookieParser");
const prisma_1 = __importDefault(require("../prisma"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = (0, cookieParser_1.cookieParser)(req.headers.cookie);
    const token = cookies.jwt_token;
    if (!token)
        return res.status(403).send("A token is required for authentication");
    try {
        let decodedToken = jsonwebtoken_1.default.verify(token, `${process.env.TOKEN_KEY}`);
        if (typeof (decodedToken) === "object") {
            const userId = decodedToken.userId;
            const user = yield prisma_1.default.user.findUnique({
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
    }
    catch (err) {
        return res.status(401).send("Invalid Token");
    }
});
exports.default = verifyToken;
