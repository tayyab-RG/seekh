import request from 'supertest';
import app from '../app';
// import prisma from '../prisma';

describe('Testing User-Read-Update/Auth-Signup', () => {
    let createdId: string;
    test('Signup', async () => {
        const res = await request(app)
            .post('/signup')
            .send({
                name: 'Peter Parker',
                email: "spiderman@avengers.com",
                password: "Ploves@MJ3000"
            })
            .set('Accept', 'application/json');

        createdId = res.body.data.id;
        expect(res.body.data).toHaveProperty("id");
    });

    test('Read', async () => {
        const res = await request(app).get(`/user/${createdId}`);
        expect(res.body.data).toEqual({
            "name": "Peter Parker",
            "email": "spiderman@avengers.com"
        });
    });

    test('Update', async () => {
        const data = {
            name: 'New Peter Parker',
            email: 'newspiderman@avengers.com',
            password: 'NEWpassword@0000',
            id: createdId
        };
        const res = await request(app)
            .put(`/user/${createdId}`)
            .send(data)
            .set('Accept', 'application/json');

        expect(res.body.success).toBeTruthy();
        expect(res.body.data).toEqual(data)
    });
})