import Controller from '../controller';

const controller = new Controller();

async function testUtilities() {
    const randomUserName = (Math.random() + 1).toString(36).substring(3);

    const authRes = await controller.Auth().signup({ email: `${randomUserName}@email.com`, password: 'Password@123', name: randomUserName });
    const userToken = authRes.token;

    const courseRes = await controller.Course({ token: userToken }).createCourse({ name: randomUserName });
    const courseId = courseRes.courseId;

    let otherRandomUserName = (Math.random() + 1).toString(36).substring(3);
    const otherAuthRes = await controller.Auth().signup({ email: `${otherRandomUserName}@email.com`, password: 'Password@123', name: otherRandomUserName });
    const otherUserToken = otherAuthRes.token;
    const otherUserId = otherAuthRes.data.id;

    return {
        userToken: userToken,
        courseId: courseId,
        otherUserToken: otherUserToken,
        otherUserId: otherUserId
    }
}

interface authUtilities {
    userToken: string,
    courseId: string,
    otherUserToken: string,
    otherUserId: string
}

let testUtils: authUtilities;

describe('enrollment tests', () => {
    beforeAll(async () => {
        const res = await testUtilities();
        testUtils = res;

    });

    test('enroll course', async () => {
        const otherToken = testUtils.otherUserToken;
        const courseId = testUtils.courseId;

        const res = await controller.Enrollment({ token: otherToken }).enrollCourse({ courseId: courseId });
        expect(res).toEqual('Enrollment request sent!');
    });

    test('enrollment requests', async () => {
        const token = testUtils.userToken;
        const res = await controller.Enrollment({ token: token }).enrollmentRequests();
        expect(res).toHaveProperty('enrollments');
    });

    test('enrollment statues', async () => {
        const token = testUtils.userToken;
        const res = await controller.Enrollment({ token: token }).getEnrollments();
        expect(res).toHaveProperty('enrollments');
    });

    test('accept request', async () => {
        const token = testUtils.userToken;
        const courseId = testUtils.courseId;
        const otherUserId = testUtils.otherUserId;

        const res = await controller.Enrollment({ token: token }).updateEnrollment({ request: 'accept', course: courseId, user: otherUserId });
        expect(res).toEqual('Enrollment request Approved.');
    });

    test('reject request', async () => {
        const token = testUtils.userToken;
        const courseId = testUtils.courseId;
        const otherUserId = testUtils.otherUserId;

        const res = await controller.Enrollment({ token: token }).updateEnrollment({ request: 'reject', course: courseId, user: otherUserId });
        expect(res).toEqual('Enrollment request Rejected.');
    });

    test('enroll course: own course', async () => {
        const token = testUtils.userToken;
        const courseId = testUtils.courseId;

        expect(async () => {
            await controller.Enrollment({ token: token }).enrollCourse({ courseId: courseId });
        }).rejects.toThrow();
    });
});