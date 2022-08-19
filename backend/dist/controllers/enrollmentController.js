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
exports.updateEnrollment = exports.enrollmentRequests = exports.enrollCourse = void 0;
const prisma_1 = __importDefault(require("../prisma"));
function enrollCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: courseId } = req.params;
        if (!courseId)
            return res.status(400).json("Course Id is required for enrollment!");
        const signedInUserId = res.locals.signedInUser.id;
        try {
            const course = yield prisma_1.default.course.findFirst({
                where: {
                    id: courseId
                }
            });
            if (!course)
                return res.status(400).json("Course Id is not valid!");
            if (course.instrutorId === signedInUserId)
                return res.status(400).json("Cannot enroll in your own course.");
        }
        catch (error) {
            console.log(error);
            res.status(500).json("Something Went Wrong!");
        }
        try {
            const enrollment = yield prisma_1.default.enrollment.create({
                data: {
                    user: {
                        connect: {
                            id: signedInUserId
                        }
                    },
                    course: {
                        connect: {
                            id: courseId
                        }
                    }
                }
            });
            res.status(200).json("Enrollment request sent!");
        }
        catch (error) {
            console.log(error);
            res.status(500).json("Something Went Wrong!");
        }
    });
}
exports.enrollCourse = enrollCourse;
function enrollmentRequests(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const signedInUserId = res.locals.signedInUser.id;
        try {
            const courses = yield prisma_1.default.course.findMany({
                where: {
                    instrutorId: signedInUserId
                },
                select: {
                    id: true
                }
            });
            const courseIds = courses.map((courseObj) => {
                return courseObj.id;
            });
            const enrollments = yield prisma_1.default.enrollment.findMany({
                where: {
                    courseId: {
                        in: courseIds
                    }
                }, select: {
                    user: true,
                    course: true,
                    status: true,
                }
            });
            const fromattedEnrollments = enrollments.map((enrollmentObj) => {
                return {
                    userName: enrollmentObj.user.name,
                    userId: enrollmentObj.user.id,
                    courseName: enrollmentObj.course.name,
                    courseId: enrollmentObj.course.id,
                    status: enrollmentObj.status
                };
            });
            res.status(200).json({ enrollemnts: fromattedEnrollments });
        }
        catch (error) {
            console.log(error);
            res.status(500).json("Something Went Wrong!");
        }
    });
}
exports.enrollmentRequests = enrollmentRequests;
function updateEnrollment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user: userId, course: courseId, request: reqType } = req.params;
        if (!userId)
            return res.status(400).json("User Id cannot be empty!");
        if (!courseId)
            return res.status(400).json("Course Id cannot be empty!");
        const signedInUserId = res.locals.signedInUser.id;
        try {
            const enrollment = yield prisma_1.default.enrollment.findFirst({
                where: {
                    userId: userId,
                    courseId: courseId
                }
            });
            if (enrollment === null)
                return res.status(404).json("Enrollemnt Request with these parameters doesn't exists!");
            const courseInstructor = yield prisma_1.default.course.findFirst({
                where: {
                    id: courseId
                },
                select: {
                    instrutorId: true
                }
            });
            if (signedInUserId != (courseInstructor === null || courseInstructor === void 0 ? void 0 : courseInstructor.instrutorId))
                return res.status(404).json("Unauthorized!");
            let enrollmentStatus;
            if (reqType === "accept")
                enrollmentStatus = "ACCEPTED";
            else if (reqType === "reject")
                enrollmentStatus = "REJECTED";
            else
                return res.status(400).json("Invalid Request!");
            const enrollmentObj = yield prisma_1.default.enrollment.update({
                where: {
                    userId_courseId: {
                        userId: userId,
                        courseId: courseId
                    }
                },
                data: {
                    status: enrollmentStatus
                }
            });
            let response = enrollmentObj.status === "APPROVED" ? "Enrollment request Approved." : "Enrollment request Rejected.";
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            res.status(500).json("Something Went Wrong!");
        }
    });
}
exports.updateEnrollment = updateEnrollment;
