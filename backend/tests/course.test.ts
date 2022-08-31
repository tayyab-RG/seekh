import request from 'supertest'
import app from '../app'
import { ValidToken, otherUserToken } from './utilities/tokenForTesting';

let createdId: string;

describe('Course Creation', () => {
    test('Request without token', async () => {
        const res = await request(app)
            .post('/course/create')
            .send({
                name: "Advanced Databases",
            })
            .set('Accept', 'application/json');

        expect(res.body.msg).toEqual('A token is required for authentication');
        expect(res.body.errorCode).toEqual(403);
    });

    test('Request with invalid token', async () => {
        const res = await request(app)
            .post('/course/create')
            .send({
                name: "Advanced Databases",
            })
            .set('Accept', 'application/json')
            .set('Cookie', ['jwt_token=randomString; Max-Age=86400; Path=/; Expires=Sat, 27 Aug 2030 05:26:11 GMT; HttpOnly']);

        expect(res.body.msg).toEqual('Invalid Token');
        expect(res.body.errorCode).toEqual(401);
    });

    test('empty name', async () => {
        const res = await request(app)
            .post('/course/create')
            .send({
                name: "",
            })
            .set('Accept', 'application/json')
            .set('Cookie', await ValidToken());

        expect(res.body.msg).toEqual('Course Name Cannot be Empty!');
        expect(res.body.errorCode).toEqual(400);
    });

    test('valid name and token', async () => {
        const res = await request(app)
            .post('/course/create')
            .send({
                name: "Advanced Databases",
            })
            .set('Accept', 'application/json')
            .set('Cookie', await ValidToken());
        createdId = res.body.courseId;
        expect(res.body).toHaveProperty('courseName');
    });

});

describe('Listing courses you are teaching', () => {
    test('Request without token', async () => {
        const res = await request(app).get('/courses');
        expect(res.body.msg).toEqual('A token is required for authentication');
        expect(res.body.errorCode).toEqual(403);
    });

    test('Request with invalid token', async () => {
        const res = await request(app)
            .get('/courses')
            .set('Cookie', ['jwt_token=randomString; Max-Age=86400; Path=/; Expires=Sat, 27 Aug 2030 05:26:11 GMT; HttpOnly']);

        expect(res.body.msg).toEqual('Invalid Token');
        expect(res.body.errorCode).toEqual(401);
    });

    test('with valid token', async () => {
        const res = await request(app).get('/courses')
            .set('Cookie', await ValidToken());

        expect(res.body).toHaveProperty('courses');
    })
})

describe('get course data', () => {
    test('course with random id', async () => {
        const res = await request(app)
            .get('/course/sdfsdf')
            .set('Cookie', await ValidToken());

        expect(res.body.msg).toEqual('Course not Found!');
        expect(res.body.errorCode).toEqual(404);
    });

    test('course info by other user', async () => {
        const res = await request(app)
            .get(`/course/${createdId}`)
            .set('Cookie', await otherUserToken());
        expect(res.body).toEqual('Unauthorized');
    });
});

describe('Course Update', () => {
    test('random id', async () => {
        const res = await request(app)
            .put('/course/dfdsfasdf')
            .send({
                name: "new name"
            })
            .set('Cookie', await ValidToken())
            .set('Accept', 'application/json');

        expect(res.body.msg).toEqual('Record Not found!');
        expect(res.body.errorCode).toEqual(404);
    });

    test('no data to update', async () => {
        const res = await request(app)
            .put(`/course/${createdId}`)
            .set('Cookie', await ValidToken())
            .set('Accept', 'application/json');

        expect(res.body.msg).toEqual('Course name is required!');
        expect(res.body.errorCode).toEqual(400);
    })

    test('updated successfully', async () => {
        const res = await request(app)
            .put(`/course/${createdId}`)
            .send({
                name: "new name"
            })
            .set('Cookie', await ValidToken())
            .set('Accept', 'application/json');

        expect(res.body.courseName).toEqual('new name')
    });
});

describe('Deleting a course', () => {
    test('Course Id check', async () => {
        const res = await request(app)
            .delete(`/course/asdsadads`)
            .set('Cookie', await ValidToken());

        expect(res.body.msg).toEqual('Unauthorized!');
        expect(res.body.errorCode).toEqual(401);
    })

    test('Unauthorized delete', async () => {
        const res = await request(app)
            .delete(`/course/${createdId}`)
            .set('Cookie', await otherUserToken());

        expect(res.body.msg).toEqual('Unauthorized!');
        expect(res.body.errorCode).toEqual(401);
    })

    test('course deleted by creator', async () => {
        const res = await request(app)
            .delete(`/course/${createdId}`)
            .set('Cookie', await ValidToken());

        expect(res.body).toEqual('Course Deleted!');
    });
});