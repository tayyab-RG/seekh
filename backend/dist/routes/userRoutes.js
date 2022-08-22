"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controllers/userController");
router.get('/users', userController_1.getAllUsers);
router.get('/user/:id', userController_1.getUser);
router.put('/user/:id', userController_1.updateUser);
module.exports = router;
