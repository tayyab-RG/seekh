import Auth from '../auth';
import User from '../users';
import Course from '../courses'
import Enrollment from '../enrollments';
import { TransportParams } from '../transportLayer/types';
import { setBaseURL } from '../transportLayer';

class Controller {
    private auth: Auth
    private user: User
    private course: Course
    private enrollment: Enrollment

    constructor(path?: string) {
        this.auth = new Auth();
        this.user = new User();
        this.course = new Course();
        this.enrollment = new Enrollment();

        setBaseURL(path);
    }

    Auth() {
        return this.auth;
    }

    User(authParams: TransportParams) {
        this.user.setTransportParams(authParams);
        return this.user;
    }

    Course(authParams: TransportParams) {
        this.course.setTransportParams(authParams);
        return this.course;
    }

    Enrollment(authParams: TransportParams) {
        this.enrollment.setTransportParams(authParams);
        return this.enrollment;
    }
}

export default Controller;