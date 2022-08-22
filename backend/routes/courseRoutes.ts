import express from 'express';
const router = express.Router();
import verifyToken from '../middlewares/authMiddleware'
import { createCourse, getUserCourses, deleteCourse, getCourse, updateCourse, getAllCourses } from '../controllers/courseController';

router.post('/course/create', verifyToken, createCourse);

router.get('/courses', verifyToken, getUserCourses);

router.delete('/course/:id', verifyToken, deleteCourse);

router.get('/course/:id', verifyToken, getCourse);

router.put('/course/:id', verifyToken, updateCourse);

router.get('/all-courses', getAllCourses);

export = router;