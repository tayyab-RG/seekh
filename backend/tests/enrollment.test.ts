import request from 'supertest'
import app from '../app'
import { ValidToken, otherUserToken } from './utilities/tokenForTesting';
import jwt from "jsonwebtoken";
import { cookieParser } from '../utilities/cookieParser';

// course that was created
let createdId: string;
// user that was enrolled in that course
let userId: string;

describe('enroll course', () => {
    test('random id', async () => {
        const res = await request(app)
            .post('/enroll/sdfdsf')
            .set('Cookie', await ValidToken());

        expect(res.body).toEqual('Course Id is not valid!');
    });

    test('Enrolling your own course', async () => {
        const createCourse = await request(app)
            .post('/course/create')
            .send({
                name: "new test course",
            })
            .set('Accept', 'application/json')
            .set('Cookie', await ValidToken());

        createdId = createCourse.body.courseId;
        const res = await request(app)
            .post(`/enroll/${createdId}`)
            .set('Cookie', await ValidToken());

        expect(res.body.msg).toEqual('Cannot enroll in your own course.');
        expect(res.body.errorCode).toEqual(403);
    });

    test('Enroll with different users', async () => {
        const res = await request(app)
            .post(`/enroll/${createdId}`)
            .set('Cookie', await otherUserToken());

        expect(res.body).toEqual('Enrollment request sent!');
    });
})

describe('List enrollment requests', () => {
    test('List enrollment requests', async () => {
        const res = await request(app)
            .get('/requests')
            .set('Cookie', await ValidToken());

        expect(res.body).toHaveProperty('enrollments');
    });
});

describe('Accept/Reject enrollment request', () => {
    test('Invalid request', async () => {
        const res = await request(app)
            .post('/random/courseid/userid')
            .set('Cookie', await ValidToken());

        expect(res.body.msg).toEqual('Invalid Request!');
        expect(res.body.errorCode).toEqual(405);;
    });

    test('random user and course ids', async () => {
        const res = await request(app)
            .post('/accept/courseid/userid')
            .set('Cookie', await ValidToken());

        expect(res.body.msg).toEqual("Enrollemnt not Found!");
        expect(res.body.errorCode).toEqual(404);
    });

    test('Authorization', async () => {
        const otherUserT = await otherUserToken();
        const otherUser = cookieParser((otherUserT)[0]).jwt_token;
        // from token to user id
        let decodedToken = jwt.verify(otherUser, `${process.env.TOKEN_KEY}`);
        userId = (typeof (decodedToken) === "object") ? decodedToken.userId : "";

        const res = await request(app)
            .post(`/accept/${createdId}/${userId}`)
            .set('Cookie', otherUserT);

        expect(res.body.msg).toEqual('Unauthorized!');
        expect(res.body.errorCode).toEqual(401);
    });

    test('Rejection', async () => {
        const res = await request(app)
            .post(`/reject/${createdId}/${userId}`)
            .set('Cookie', await ValidToken());

        expect(res.body).toEqual('Enrollment request Rejected.');
    });

    test('Acceptance', async () => {
        const res = await request(app)
            .post(`/accept/${createdId}/${userId}`)
            .set('Cookie', await ValidToken());

        expect(res.body).toEqual('Enrollment request Approved.');
    });
});

describe('List user Enrollments', () => {
    test('List user Enrollments', async () => {
        const res = await request(app)
            .get('/enrollments')
            .set('Cookie', await otherUserToken());

        expect(res.body).toHaveProperty('enrollments');
    });
});