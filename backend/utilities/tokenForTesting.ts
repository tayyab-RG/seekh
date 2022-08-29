import request from 'supertest'
import app from '../app'

export async function ValidToken() {

    let tokenRes = await request(app)
        .post('/login')
        .send({
            email: "user@test.com",
            password: "NEWpassword@0000"
        })
        .set('Accept', 'application/json');

    if (tokenRes.statusCode != 200) {
        tokenRes = await request(app)
            .post('/signup')
            .send({
                name: "new test user",
                email: "user@test.com",
                password: "NEWpassword@0000"
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
            password: "NEWpassword@0000"
        })
        .set('Accept', 'application/json');

    if (tokenRes.statusCode != 200) {
        tokenRes = await request(app)
            .post('/signup')
            .send({
                name: "other user",
                email: "otheruser@test.com",
                password: "NEWpassword@0000"
            })
            .set('Accept', 'application/json');
    }


    const { header } = tokenRes;
    return [...header["set-cookie"]];
}