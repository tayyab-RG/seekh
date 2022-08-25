import request from 'supertest';
import app from '../app';

describe('sample testing', () => {
    test('tesitng request', async () => {
        const res = await request(app).get('/users');
        expect(res.body).toEqual({
            "users": [
                {
                    "id": "7f6a3a5e-0207-4a73-80c4-fde3885136db",
                    "name": "Peter Parker",
                    "email": "spiderman@avengers.com"
                },
                {
                    "id": "bbef4b12-553c-4ae6-bc4c-517909f0b350",
                    "name": "Peter Parker",
                    "email": "hulk@avengers.com"
                }
            ]
        });
    });
})