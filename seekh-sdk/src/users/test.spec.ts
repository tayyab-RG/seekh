import Controller from '../controller';

const controller = new Controller();

describe('user tests', () => {
    test('valid id', async () => {
        let randomUserName = (Math.random() + 1).toString(36).substring(3);
        const authRes = await controller.Auth().signup({ email: `${randomUserName}@email.com`, password: 'Password@123', name: randomUserName });

        const userId = authRes.data.id;
        const token = authRes.token;

        const userRes = await controller.User({ token: authRes.token }).getUser({ id: userId });
        expect(userRes.data).toHaveProperty('id');
        expect(userRes.data).toHaveProperty('name');
        expect(userRes.data).toHaveProperty('email');
    });

    test('update user', async () => {
        let randomUserName = (Math.random() + 1).toString(36).substring(3);
        const authRes = await controller.Auth().signup({ email: `${randomUserName}@email.com`, password: 'Password@123', name: randomUserName });

        const userId = authRes.data.id;
        const token = authRes.token;

        const userRes = await controller.User({ token: token }).updateUser({ id: userId, name: 'new name' });
        expect(userRes.data.name).toEqual('new name');
    });

    test('random id', async () => {
        expect(async () => {
            await controller.User({ token: "random string" }).getUser({ id: "random string" });
        })
            .rejects
            .toThrow();
    });
});