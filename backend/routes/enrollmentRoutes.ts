import express from 'express';
const router = express.Router();
import { enrollCourse, enrollmentRequests, updateEnrollment, getEnrollmentsStatus } from '../controllers/enrollmentController'
import verifyToken from '../middlewares/authMiddleware';
import handleError from '../middlewares/errorMiddleware';

router.post('/enroll/:id', verifyToken, enrollCourse, handleError);

router.get('/requests', verifyToken, enrollmentRequests, handleError);

router.post('/:request/:course/:user', verifyToken, updateEnrollment, handleError);

router.get('/enrollments', verifyToken, getEnrollmentsStatus, handleError);

export = router;