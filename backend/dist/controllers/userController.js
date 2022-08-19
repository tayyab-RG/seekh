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
exports.getUser = exports.updateUser = exports.getAllUsers = void 0;
const prisma_1 = __importDefault(require("../prisma"));
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield prisma_1.default.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            });
            res.status(200).json({ users });
        }
        catch (err) {
            res.status(500).json({ msg: "Something Went wrong!" });
        }
    });
}
exports.getAllUsers = getAllUsers;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { name, email, password } = req.body;
        if (!name)
            return res.status(400).json({ success: false, msg: 'Name cannot be empty!' });
        if (!email)
            return res.status(400).json({ success: false, msg: 'Email cannot be empty!' });
        if (!password)
            return res.status(400).json({ success: false, msg: 'Password cannot be empty!' });
        try {
            const updatedPerson = yield prisma_1.default.user.update({
                where: {
                    id: id,
                },
                data: {
                    name: name,
                    email: email,
                    password: password
                },
            });
            res.status(200).json({ success: true, data: updatedPerson });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, msg: 'Something went wrong!' });
        }
    });
}
exports.updateUser = updateUser;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        if (!id)
            res.status(400).json({ msg: "Id is required!" });
        try {
            const user = yield prisma_1.default.user.findUnique({
                where: {
                    id: id,
                },
                select: {
                    name: true,
                    email: true
                }
            });
            res.status(200).json({ data: user });
        }
        catch (error) {
            console.log(error);
            res.status(404).json({ msg: "User with given Id not found!" });
        }
    });
}
exports.getUser = getUser;
