import express from 'express';
const router = express.Router();
import verifyToken from '../middlewares/authMiddleware'
import { createCourse, getAllCourses, deleteCourse, getCourse, updateCourse } from '../controllers/courseController';

router.post('/course/create', verifyToken, createCourse);

router.get('/courses', verifyToken, getAllCourses);

router.delete('/course/:id', verifyToken, deleteCourse);

router.get('/course/:id', verifyToken, getCourse);

router.put('/course/:id', verifyToken, updateCourse);

export = router;