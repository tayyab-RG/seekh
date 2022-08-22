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
exports.updateCourse = exports.getCourse = exports.deleteCourse = exports.getAllCourses = exports.createCourse = void 0;
const prisma_1 = __importDefault(require("../prisma"));
function createCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { name } = req.body;
        if (!name)
            return res.status(401).json("Course Name Cannot be Empty!");
        try {
            const course = yield prisma_1.default.course.create({
                data: {
                    name: name,
                    instructor: {
                        connect: { id: res.locals.signedInUser.id }
                    }
                },
                include: {
                    instructor: true,
                }
            });
            res.status(201).json({ courseName: course.name, courseId: course.id, instructorId: course.instrutorId });
        }
        catch (error) {
            console.log(error);
            res.status(500).json('Something went wrong!');
        }
    });
}
exports.createCourse = createCourse;
function getAllCourses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courses = yield prisma_1.default.course.findMany({
                where: {
                    instrutorId: res.locals.signedInUser.id
                },
                select: {
                    id: true,
                    name: true,
                    instrutorId: true,
                }
            });
            res.status(200).json({ courses: courses });
        }
        catch (error) {
            console.log(error);
            res.status(400).json("Something Went Wrong!");
        }
    });
}
exports.getAllCourses = getAllCourses;
function deleteCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const userCourses = yield prisma_1.default.course.findMany({
                where: {
                    AND: [
                        { instrutorId: res.locals.signedInUser.id },
                        { id: id }
                    ]
                }
            });
            if (!userCourses || userCourses.length === 0)
                return res.status(401).json("Unauthorized!");
            const deletedCourse = yield prisma_1.default.course.delete({
                where: {
                    id: id
                }
            });
            res.status(200).json("Course Deleted!");
        }
        catch (error) {
            console.log(error);
            res.status(400).json("Something Went Wrong!");
        }
    });
}
exports.deleteCourse = deleteCourse;
function getCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        if (!id)
            return res.status(401).json("Course Id is required!");
        try {
            const course = yield prisma_1.default.course.findFirst({
                where: {
                    id: id
                },
                select: {
                    name: true,
                    instructor: true,
                    instrutorId: true
                }
            });
            if (!course)
                return res.status(404).json("Course not Found!");
            res.status(200).json({
                courseName: course.name,
                instructorName: course.instructor.name
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json("something Went Wrong!");
        }
    });
}
exports.getCourse = getCourse;
function updateCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        if (!id)
            return res.status(401).json("Course Id is required!");
        const { name } = req.body;
        if (!name)
            return res.status(400).json("Course name is required!");
        try {
            const course = yield prisma_1.default.course.update({
                where: {
                    id: id
                }, data: {
                    name: name
                },
                include: {
                    instructor: true
                }
            });
            res.status(200).json({ courseName: course.name, instructorName: course.instructor.name });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.updateCourse = updateCourse;
