import request from 'supertest'
import app from '../../app'

export async function ValidToken() {

    let tokenRes = await request(app)
        .post('/login')
        .send({
            email: "user@test.com",
            password: "Password@0000"
        })
        .set('Accept', 'application/json');

    if (!tokenRes.body.token) {
        tokenRes = await request(app)
            .post('/signup')
            .send({
                name: "test user",
                email: "user@test.com",
                password: "Password@0000"
            })
            .set('Accept', 'application/json');
    }

    const { header } = tokenRes;
    return ([...header["set-cookie"]])
}

export async function otherUserToken() {
    let tokenRes = await request(app)
        .post('/login')
        .send({
            email: "otheruser@test.com",
            password: "Password@0000"
        })
        .set('Accept', 'application/json');

    if (!tokenRes.body.token) {
        tokenRes = await request(app)
            .post('/signup')
            .send({
                name: "other user",
                email: "otheruser@test.com",
                password: "Password@0000"
            })
            .set('Accept', 'application/json');
    }

    const { header } = tokenRes;
    return [...header["set-cookie"]];
}