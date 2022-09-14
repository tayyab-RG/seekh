import Controller from '../controller';

const controller = new Controller();

async function testUtilities() {
    let randomUserName = (Math.random() + 1).toString(36).substring(3);
    let authRes;
    try {
        authRes = await controller.Auth().signup({ email: `${randomUserName}@email.com`, password: 'Password@123', name: randomUserName });
    } catch (error) {
        authRes = await controller.Auth().login({ email: `${randomUserName}@email.com`, password: 'Password@123' });
    }

    const userToken = authRes.token;

    const courseRes = await controller.Course().createCourse({ name: randomUserName, token: userToken });
    const courseId = courseRes.courseId;

    let otherRandomUserName = (Math.random() + 1).toString(36).substring(3);
    let otherAuthRes;
    try {
        otherAuthRes = await controller.Auth().signup({ email: `${otherRandomUserName}@email.com`, password: 'Password@123', name: otherRandomUserName });
    } catch (error) {
        otherAuthRes = await controller.Auth().login({ email: `${otherRandomUserName}@email.com`, password: 'Password@123' });
    }
    const otherUserToken = otherAuthRes.token;
    const otherUserId = otherAuthRes.data.id;

    return {
        userToken: userToken,
        courseId: courseId,
        otherUserToken: otherUserToken,
        otherUserId: otherUserId
    }
}

describe('enrollment tests', () => {
    test('enroll course', async () => {
        const token = (await testUtilities()).userToken;
        const otherToken = (await testUtilities()).otherUserToken;
        const courseId = (await testUtilities()).courseId;

        const res = await controller.Enrollment().enrollCourse({ courseId: courseId, token: otherToken });
        expect(res).toEqual('Enrollment request sent!');
    });

    test('enrollment requests', async () => {
        const token = (await testUtilities()).userToken;
        const res = await controller.Enrollment().enrollmentRequests({ token: token });
        expect(res).toHaveProperty('enrollments');
    });

    test('enrollment statues', async () => {
        const token = (await testUtilities()).userToken;
        const res = await controller.Enrollment().getEnrollments({ token: token });
        expect(res).toHaveProperty('enrollments');
    });

    test('accept request', async () => {
        const token = (await testUtilities()).userToken;
        const courseId = (await testUtilities()).courseId;
        const otherUserId = (await testUtilities()).otherUserId;

        const res = await controller.Enrollment().updateEnrollment({ request: 'accept', courseId: courseId, userId: otherUserId, token: token });
        expect(res).toEqual('Enrollment request Approved.');
    });

    test('reject request', async () => {
        const token = (await testUtilities()).userToken;
        const courseId = (await testUtilities()).courseId;
        const otherUserId = (await testUtilities()).otherUserId;

        const res = await controller.Enrollment().updateEnrollment({ request: 'reject', courseId: courseId, userId: otherUserId, token: token });
        expect(res).toEqual('Enrollment request Rejected.');
    });

    test('enroll course: own course', async () => {
        const token = (await testUtilities()).userToken;
        const courseId = (await testUtilities()).courseId;

        expect(async () => {
            await controller.Enrollment().enrollCourse({ courseId: courseId, token: token });
        }).rejects.toThrow();
    });
});