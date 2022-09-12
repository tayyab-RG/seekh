import Auth from '../auth';

class Controller {
    private auth: Auth

    constructor() {
        this.auth = new Auth();
    }

    getAuth() {
        return this.auth;
    }
}

export default Controller;