import axios from "axios";
import { reqPayload } from "./types";

const api = axios.create({ baseURL: 'http://localhost:5000' });

export async function generateRequest(reqParams: reqPayload) {
    try {
        switch (reqParams.type) {
            case 'get':
                break;
            case 'post':
                return (await api.post(reqParams.url, reqParams.body)).data;
                break;
            case 'put':
                break;
            case 'delete':
                break;
            default:
                break;
        }
    } catch (error) {
        throw error.response.data;
    }
}