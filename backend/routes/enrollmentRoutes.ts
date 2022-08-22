import express from 'express';
const router = express.Router();
import { enrollCourse, enrollmentRequests, updateEnrollment, getEnrollmentsStatus, getAllenrollments } from '../controllers/enrollmentController'
import verifyToken from '../middlewares/authMiddleware';

router.post('/enroll/:id', verifyToken, enrollCourse);

router.get('/requests', verifyToken, enrollmentRequests);

router.post('/:request/:course/:user', verifyToken, updateEnrollment);

router.get('/enrollments', verifyToken, getEnrollmentsStatus);

router.get('/all-enrollments', getAllenrollments);

export = router;