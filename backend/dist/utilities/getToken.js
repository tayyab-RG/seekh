"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getToken(userId) {
    return jsonwebtoken_1.default.sign({ userId }, `${process.env.TOKEN_KEY}`, {
        expiresIn: "1h"
    });
}
exports.getToken = getToken;
