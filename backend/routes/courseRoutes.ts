import express from 'express';
const router = express.Router();
import verifyToken from '../middlewares/authMiddleware'
import { createCourse, getAllCourses, deleteCourse, getCourse } from '../controllers/courseController';

router.post('/course/create', verifyToken, createCourse);

router.get('/courses', verifyToken, getAllCourses);

router.delete('/course/:id', verifyToken, deleteCourse);

router.get('/course/:id', verifyToken, getCourse);

export = router;