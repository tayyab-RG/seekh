"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const enrollmentController_1 = require("../controllers/enrollmentController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
router.post('/enroll/:id', authMiddleware_1.default, enrollmentController_1.enrollCourse);
router.get('/requests', authMiddleware_1.default, enrollmentController_1.enrollmentRequests);
router.post('/:request/:course/:user', authMiddleware_1.default, enrollmentController_1.updateEnrollment);
module.exports = router;
