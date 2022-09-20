import express from 'express';
const router = express.Router();
import verifyToken from '../middlewares/authMiddleware'
import { createCourse, getUserCourses, deleteCourse, getCourse, updateCourse, getAllCourses } from '../controllers/courseController';
import handleError from '../middlewares/errorMiddleware';

router.post('/course/create', verifyToken, createCourse, handleError);

router.get('/courses', verifyToken, getUserCourses, handleError);

router.delete('/course/:id', verifyToken, deleteCourse, handleError);

router.get('/course/:id', verifyToken, getCourse, handleError);

router.put('/course/:id', verifyToken, updateCourse, handleError);

router.get('/all-courses', getAllCourses, handleError);

export = router;