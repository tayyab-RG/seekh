import { UserResponse, getUserPayload, updateUserPayload } from "./types";

import { generateRequest } from '../transportLayer';

class User {
    async getUser(userParams: getUserPayload): Promise<UserResponse> {
        try {
            return await generateRequest({ type: 'get', url: `/user/${userParams.id}`, token: userParams.token });
        } catch (error) {
            throw error
        }
    }

    async updateUser(userParams: updateUserPayload): Promise<UserResponse> {
        try {
            return await generateRequest({
                type: 'put',
                url: `/user/${userParams.id}`,
                token: userParams.token,
                body: {
                    name: userParams.name,
                    email: userParams.email,
                    password: userParams.password
                }
            });
        } catch (error) {
            throw error
        }
    }
}

export default User