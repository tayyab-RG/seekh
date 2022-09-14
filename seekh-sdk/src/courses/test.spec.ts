import Controller from '../controller';

const controller = new Controller();

describe('course tests', () => {
    let userToken: string, courseId: string;
    test('create course', async () => {
        let randomUserName = (Math.random() + 1).toString(36).substring(3);
        const authRes = await controller.Auth().signup({ email: `${randomUserName}@email.com`, password: 'Password@123', name: randomUserName });
        userToken = authRes.token;

        const res = await controller.Course().createCourse({ name: "New Course", token: `${userToken}` });
        courseId = res.courseId;
        expect(res).toHaveProperty('courseName');
        expect(res).toHaveProperty('courseId');
        expect(res).toHaveProperty('instructorId');
    });

    test('get course', async () => {
        const res = await controller.Course().getCourse({ id: courseId, token: userToken });
        expect(res).toHaveProperty('courseName');
        expect(res).toHaveProperty('instructorName');
    });

    test('get course with random id', async () => {
        expect(async () => {
            await controller.Course().getCourse({ id: "random string", token: userToken });
        })
            .rejects
            .toThrow();
    });

    test('update course', async () => {
        const res = await controller.Course().updateCourse({ id: courseId, name: "New Name", token: userToken });
        expect(res).toHaveProperty('courseName');
        expect(res).toHaveProperty('instructorName');
    });

    test('dalete course', async () => {
        const res = await controller.Course().deleteCourse({ id: courseId, token: userToken });
        expect(res).toEqual('Course Deleted!');
    });

    test('instructor courses', async () => {
        const res = await controller.Course().getUserCourses({ token: userToken });
        expect(res).toHaveProperty('courses');
    });
});