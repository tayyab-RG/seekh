import express from 'express';
const router = express.Router();
import { enrollCourse, enrollmentRequests } from '../controllers/enrollmentController'
import verifyToken from '../middlewares/authMiddleware';

router.post('/enroll/:id', verifyToken, enrollCourse);

router.get('/requests', verifyToken, enrollmentRequests);

export = router;