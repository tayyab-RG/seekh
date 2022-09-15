import Controller from '../controller';

const controller = new Controller();

let randomUserName: string;
describe('auth tests', () => {
    test('successfull signup', async () => {
        randomUserName = (Math.random() + 1).toString(36).substring(3);
        const res = await controller.Auth().signup({ email: `${randomUserName}@email.com`, password: 'Password@123', name: randomUserName });
        expect(res).toHaveProperty("token");
        expect(res).toHaveProperty("data");
    });

    test('valid login', async () => {
        const res = await controller.Auth().login({ email: `${randomUserName}@email.com`, password: 'Password@123' });
        expect(res).toHaveProperty("token");
        expect(res).toHaveProperty("data");
    });

    test('invalid login credentials', () => {
        expect(async () => {
            const res = await controller.Auth().login({ email: `${randomUserName}@email.com`, password: '@123' });
        })
            .rejects
            .toThrow();
    });

    test('user exists', () => {
        expect(async () => {
            const res = await controller.Auth().signup({ email: `${randomUserName}@email.com`, password: 'Password@123', name: randomUserName });
        })
            .rejects
            .toThrow();
    });
});