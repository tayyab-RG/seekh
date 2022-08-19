"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController_1 = require("../controllers/authController");
router.post('/signup', authController_1.userSignup);
router.post('/login', authController_1.userLogin);
router.post('/logout', authController_1.userLogout);
module.exports = router;
