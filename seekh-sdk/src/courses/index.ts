import {
    GetCoursePayload,
    GetCourseResponse,
    CreateCoursePayload,
    CreateCourseResponse,
    UpdateCoursePayload,
    UpdateCourseResponse,
    CoursesResponse
} from "./types";

import { generateRequest } from '../transportLayer';
import { TransportParams } from "../transportLayer/types";

class Course {
    private trasnsportParams: TransportParams = { token: "" };

    setTransportParams(trasnsportParams: TransportParams) {
        this.trasnsportParams = trasnsportParams;
    }

    async createCourse(courseParams: CreateCoursePayload): Promise<CreateCourseResponse> {
        try {
            return await generateRequest({
                type: 'post',
                url: '/course/create',
                token: `${this.trasnsportParams.token}`,
                body: { name: courseParams.name },
                headers: this.trasnsportParams.headers
            });
        } catch (error) {
            throw error
        }
    }

    async getCourse(courseParams: GetCoursePayload): Promise<GetCourseResponse> {
        try {
            return await generateRequest({ type: 'get', url: `/course/${courseParams.id}`, token: `${this.trasnsportParams.token}`, headers: this.trasnsportParams.headers });
        } catch (error) {
            throw error
        }
    }

    async updateCourse(courseParams: UpdateCoursePayload): Promise<UpdateCourseResponse> {
        try {
            return await generateRequest({ type: 'put', url: `/course/${courseParams.id}`, token: `${this.trasnsportParams.token}`, body: { name: courseParams.name }, headers: this.trasnsportParams.headers });
        } catch (error) {
            throw error
        }
    }

    async deleteCourse(courseParams: GetCoursePayload): Promise<string> {
        try {
            return await generateRequest({ type: 'delete', url: `/course/${courseParams.id}`, token: `${this.trasnsportParams.token}`, headers: this.trasnsportParams.headers })
        } catch (error) {
            throw error
        }
    }

    async getUserCourses(): Promise<CoursesResponse> {
        try {
            return await generateRequest({ type: 'get', url: '/courses', token: `${this.trasnsportParams.token}`, headers: this.trasnsportParams.headers });
        } catch (error) {
            throw error
        }
    }
}

export default Course