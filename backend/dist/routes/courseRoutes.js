"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const courseController_1 = require("../controllers/courseController");
router.post('/course/create', authMiddleware_1.default, courseController_1.createCourse);
router.get('/courses', authMiddleware_1.default, courseController_1.getAllCourses);
router.delete('/course/:id', authMiddleware_1.default, courseController_1.deleteCourse);
router.get('/course/:id', authMiddleware_1.default, courseController_1.getCourse);
router.put('/course/:id', authMiddleware_1.default, courseController_1.updateCourse);
module.exports = router;
