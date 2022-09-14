import { UserResponse, getUserPayload, updateUserPayload } from "./types";
import { generateRequest } from '../transportLayer';
import { TransportParams } from "../transportLayer/types";

class User {
    private trasnsportParams: TransportParams = { token: "" };

    setTransportParams(trasnsportParams: TransportParams) {
        this.trasnsportParams = trasnsportParams;
    }

    async getUser(userParams: getUserPayload): Promise<UserResponse> {
        try {
            return await generateRequest({ type: 'get', url: `/user/${userParams.id}`, token: this.trasnsportParams.token, headers: this.trasnsportParams.headers });
        } catch (error) {
            throw error
        }
    }

    async updateUser(userParams: updateUserPayload): Promise<UserResponse> {
        try {
            return await generateRequest({
                type: 'put',
                url: `/user/${userParams.id}`,
                token: this.trasnsportParams.token,
                body: {
                    name: userParams.name,
                    email: userParams.email,
                    password: userParams.password
                },
                headers: this.trasnsportParams.headers
            });
        } catch (error) {
            throw error
        }
    }
}

export default User