import { login, signup, AuthResponse } from './types';
import { generateRequest } from '../transportLayer';

class Auth {
    async login(loginCredentials: login): Promise<AuthResponse> {
        try {
            return await generateRequest({ type: 'post', url: '/login', body: loginCredentials });
        } catch (error) {
            throw error
        }
    }

    async signup(signupCredentials: signup): Promise<AuthResponse> {
        try {
            return await generateRequest({ type: 'post', url: '/signup', body: signupCredentials });
        } catch (error) {
            throw error
        }
    }
}

export default Auth;