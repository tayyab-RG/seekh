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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getAllUsers = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createUser(name, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.create({
            data: {
                name: name,
                email: email,
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        return user;
    });
}
exports.createUser = createUser;
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield prisma.user.findMany();
        return users;
    });
}
exports.getAllUsers = getAllUsers;
function deleteUser(id) {
    if (!id)
        return;
    return prisma.user.delete({
        where: {
            id: id,
        },
    });
}
exports.deleteUser = deleteUser;
function updateUser(id, name, email) {
    return prisma.user.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            email: email
        },
    });
}
exports.updateUser = updateUser;
