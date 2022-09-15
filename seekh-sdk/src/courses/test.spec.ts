import Controller from '../controller';

const controller = new Controller();

describe('course tests', () => {
    afterEach(() => {
        jest.resetAllMocks();
    })

    let userToken: string, courseId: string;
    test('create course', async () => {
        let randomUserName = (Math.random() + 1).toString(36).substring(3);
        const authRes = await controller.Auth().signup({ email: `${randomUserName}@email.com`, password: 'Password@123', name: randomUserName });
        userToken = authRes.token;

        const res = await controller.Course({ token: userToken }).createCourse({ name: "New Course" });
        courseId = res.courseId;
        expect(res).toHaveProperty('courseName');
        expect(res).toHaveProperty('courseId');
        expect(res).toHaveProperty('instructorId');
    });

    test('get course', async () => {
        const res = await controller.Course({ token: userToken }).getCourse({ id: courseId });
        expect(res).toHaveProperty('courseName');
        expect(res).toHaveProperty('instructorName');
    });

    test('get course with random id', async () => {
        expect(async () => {
            await controller.Course({ token: userToken }).getCourse({ id: "random string" });
        })
            .rejects
            .toThrow();
    });

    test('update course', async () => {
        const res = await controller.Course({ token: userToken }).updateCourse({ id: courseId, name: "New Name" });
        expect(res).toHaveProperty('courseName');
        expect(res).toHaveProperty('instructorName');
    });

    test('dalete course', async () => {
        const res = await controller.Course({ token: userToken }).deleteCourse({ id: courseId });
        expect(res).toEqual('Course Deleted!');
    });

    test('instructor courses', async () => {
        const res = await controller.Course({ token: userToken }).getUserCourses();
        expect(res).toHaveProperty('courses');
    });
});