import Controller from '../controller';

const controller = new Controller();

describe('auth tests', () => {
    test('valid login', async () => {
        const res = await controller.getAuth().login({ email: 'user4@email.com', password: 'Password@123' });
        expect(res).toHaveProperty("token");
        expect(res).toHaveProperty("data");
    });

    test('successfull signup', async () => {
        let randomUserName = (Math.random() + 1).toString(36).substring(3);
        const res = await controller.getAuth().signup({ email: `${randomUserName}@email.com`, password: 'Password@123', name: randomUserName });
        expect(res).toHaveProperty("token");
        expect(res).toHaveProperty("data");
    });

    test('invalid login credentials', () => {
        expect(async () => {
            const res = await controller.getAuth().login({ email: 'user4@email.com', password: '@123' });
        })
            .rejects
            .toThrow();
    });

    test('user exists', () => {
        expect(async () => {
            const res = await controller.getAuth().signup({ email: 'user4@email.com', password: '@123', name: "user 4" });
        })
            .rejects
            .toThrow();
    });
});