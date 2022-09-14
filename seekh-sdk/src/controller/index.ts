import Auth from '../auth';
import User from '../users';
import Course from '../courses'
import Enrollment from '../enrollments';

class Controller {
    private auth: Auth
    private user: User
    private course: Course
    private enrollment: Enrollment

    constructor() {
        this.auth = new Auth();
        this.user = new User();
        this.course = new Course();
        this.enrollment = new Enrollment();
    }

    Auth() {
        return this.auth;
    }

    User() {
        return this.user;
    }

    Course() {
        return this.course
    }

    Enrollment() {
        return this.enrollment
    }
}

export default Controller;