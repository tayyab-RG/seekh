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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_1 = require("../controllers/user");
router.post('/user/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email } = req.body;
    if (!name)
        return res.status(400).json({ success: false, msg: 'Name cannot be emoty!' });
    if (!email)
        return res.status(400).json({ success: false, msg: 'Email cannot be emoty!' });
    try {
        const user = yield (0, user_1.createUser)(name, email);
        res.status(201).json({ success: true, msg: "person added.", data: user });
    }
    catch (error) {
        res.status(500).json({ success: false, msg: 'Something went wrong!' });
    }
}));
router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, user_1.getAllUsers)();
    res.status(200).json({ data: users });
}));
router.delete('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        let updatedPerson = yield (0, user_1.deleteUser)(id);
        res.status(200).json({ success: true, data: updatedPerson });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: 'Something went wrong!' });
    }
}));
router.put('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    if (!name)
        return res.status(400).json({ success: false, msg: 'Name cannot be emoty!' });
    if (!email)
        return res.status(400).json({ success: false, msg: 'Email cannot be emoty!' });
    const { id } = req.params;
    try {
        let updatedPerson = yield (0, user_1.updateUser)(id, name, email);
        res.status(200).json({ success: true, data: updatedPerson });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: 'Something went wrong!' });
    }
}));
module.exports = router;
