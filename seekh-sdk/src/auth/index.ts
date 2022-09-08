import axios from 'axios';
import { login, signup } from './types';

const api = axios.create({ baseURL: 'http://localhost:5000' })

class Auth {
    static login(loginCredentials: login) {
        return new Promise((resolve, reject) => {
            api.post('/login', loginCredentials)
                .then(res => {
                    resolve(res.data)
                })
                .catch(error => {
                    reject(error)
                });
        });
    }

    static signup(signupCredentials: signup) {
        return new Promise((resolve, reject) => {
            api.post('/signup', signupCredentials)
                .then(res => {
                    resolve(res.data)
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

export default Auth;