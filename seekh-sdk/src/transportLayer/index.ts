import axios from "axios";
import { reqPayload } from "./types";

const api = axios.create({ baseURL: 'http://localhost:5000' });

export async function generateRequest(reqParams: reqPayload) {
    try {
        const config = {
            headers: {
                jwt_token: `${reqParams.token}`
            }
        }
        switch (reqParams.type) {
            case 'get':
                return (await api.get(reqParams.url, config)).data;
            case 'post':
                return (await api.post(reqParams.url, reqParams.body, config)).data;
            case 'put':
                return (await api.put(reqParams.url, reqParams.body, config)).data;
            case 'delete':
                return (await api.delete(reqParams.url, config)).data;
        }
    } catch (error) {
        throw error.response.data;
    }
}