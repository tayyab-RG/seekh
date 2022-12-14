import request from 'supertest';
import app from '../app';


const testUser = async () => {
    const res = await request(app)
        .post('/signup')
        .send({
            name: "new test user",
            email: "newuser@test.com",
            password: "NEWpassword@0000"
        })
        .set('Accept', 'application/json');
}

describe('Testing Auth-Login', () => {
    test('Incorrect email', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: "random string",
                password: "Ploves@MJ3000"
            })
            .set('Accept', 'application/json');

        expect(res.body.msg).toEqual("Invalid Credentials!");
        expect(res.body.errorCode).toEqual(403);
    });

    test('Incorrect password', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: "spiderman@avengers.com",
                password: "random string"
            })
            .set('Accept', 'application/json');

        expect(res.body.msg).toEqual("Invalid Credentials!");
        expect(res.body.errorCode).toEqual(403);
    });

    test('empty email', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: "",
                password: "random string"
            })
            .set('Accept', 'application/json');

        expect(res.body.msg).toEqual("Email cannot be empty!");
        expect(res.body.errorCode).toEqual(400);
    });

    test('empty password', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: "spiderman@avengers.com",
                password: ""
            })
            .set('Accept', 'application/json');

        expect(res.body.msg).toEqual("Password cannot be empty!");
        expect(res.body.errorCode).toEqual(400);
    });

    test('valid credentials', async () => {
        // making sure the user exists
        await testUser();

        const res = await request(app)
            .post('/login')
            .send({
                email: "newuser@test.com",
                password: "NEWpassword@0000"
            })
            .set('Accept', 'application/json');

        expect(res.body).toHaveProperty("token");
        expect(res.body).toHaveProperty("data");
    });
});