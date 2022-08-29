import request from 'supertest'
import app from '../app'
import { ValidToken, otherUserToken } from '../utilities/tokenForTesting';

let createdId: string;

describe('Course Creation', () => {
    test('Request without token', async () => {
        const res = await request(app)
            .post('/course/create')
            .send({
                name: "Advanced Databases",
            })
            .set('Accept', 'application/json');

        expect(res.body).toEqual('A token is required for authentication');
    });

    test('Request with invalid token', async () => {
        const res = await request(app)
            .post('/course/create')
            .send({
                name: "Advanced Databases",
            })
            .set('Accept', 'application/json')
            .set('Cookie', ['jwt_token=randomString; Max-Age=86400; Path=/; Expires=Sat, 27 Aug 2030 05:26:11 GMT; HttpOnly']);

        expect(res.body).toEqual('Invalid Token');
    });

    test('empty name', async () => {
        const res = await request(app)
            .post('/course/create')
            .send({
                name: "",
            })
            .set('Accept', 'application/json')
            .set('Cookie', await ValidToken());

        expect(res.body).toEqual('Course Name Cannot be Empty!');
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
        expect(res.body).toEqual('A token is required for authentication');
    });

    test('Request with invalid token', async () => {
        const res = await request(app)
            .get('/courses')
            .set('Cookie', ['jwt_token=randomString; Max-Age=86400; Path=/; Expires=Sat, 27 Aug 2030 05:26:11 GMT; HttpOnly']);

        expect(res.body).toEqual('Invalid Token');
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

        expect(res.body).toEqual('Course not Found!');
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

        expect(res.body).toEqual('Course not Found!')
    });

    test('no data to update', async () => {
        const res = await request(app)
            .put(`/course/${createdId}`)
            .set('Cookie', await ValidToken())
            .set('Accept', 'application/json');

        expect(res.body).toEqual('Course name is required!')
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
        const res = await request(app).delete(`/course/asdsadads`)
            .set('Cookie', await ValidToken());;
        expect(res.body).toEqual("Unauthorized!");
    })

    test('Unauthorized delete', async () => {
        const res = await request(app)
            .delete(`/course/${createdId}`)
            .set('Cookie', await otherUserToken());

        expect(res.body).toEqual('Unauthorized!');
    })

    test('course deleted by creator', async () => {
        const res = await request(app)
            .delete(`/course/${createdId}`)
            .set('Cookie', await ValidToken());

        expect(res.body).toEqual('Course Deleted!');
    });
});