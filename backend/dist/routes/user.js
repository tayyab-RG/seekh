"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_1 = require("../controllers/user");
router.post('/user/create', user_1.createUser);
router.get('/users', user_1.getAllUsers);
router.get('/user/:id', user_1.getUser);
router.delete('/user/:id', user_1.deleteUser);
router.put('/user/:id', user_1.updateUser);
module.exports = router;
