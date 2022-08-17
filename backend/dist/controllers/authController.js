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
exports.userLogin = exports.userSignup = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utilities_1 = require("../utilities/utilities");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
function userSignup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { name, email, password } = req.body;
        if (!name)
            return res.status(400).json({ success: false, msg: 'Name cannot be empty!' });
        if (!email)
            return res.status(400).json({ success: false, msg: 'Email cannot be empty!' });
        if (!password)
            return res.status(400).json({ success: false, msg: 'Password cannot be empty!' });
        // Check if email already exists
        const oldUser = yield prisma.user.findFirst({
            where: {
                email: email,
            }
        });
        if (oldUser) {
            return res.status(409).send("User Already Exist!");
        }
        const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        try {
            const user = yield prisma.user.create({
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
            });
            const token = (0, utilities_1.getToken)(user.id);
            res.cookie('jwt_token', token, { httpOnly: true, maxAge: 1000 * 3600 * 24 });
            res.status(201).json({ success: true, msg: "User added.", data: user, token: token });
        }
        catch (error) {
            res.status(500).json({ success: false, msg: 'Something went wrong!' });
        }
    });
}
exports.userSignup = userSignup;
function userLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!email)
            return res.status(400).json({ success: false, msg: 'Email cannot be empty!' });
        if (!password)
            return res.status(400).json({ success: false, msg: 'Password cannot be empty!' });
        const user = yield prisma.user.findFirst({
            where: {
                email: email,
            }
        });
        if (!user)
            res.status(404).json({ msg: "User with email does not exists!" });
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            // Create token
            const token = (0, utilities_1.getToken)(user.id);
            res.cookie('jwt_token', token, { httpOnly: true, maxAge: 1000 * 3600 * 24 });
            return res.status(200).json({ msg: "User Logged in Successfully!", data: user });
        }
        res.status(400).json({ msg: "Invalid Credentials!" });
    });
}
exports.userLogin = userLogin;
