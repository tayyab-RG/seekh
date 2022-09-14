import {
    GetCoursePayload,
    GetCourseResponse,
    CreateCoursePayload,
    CreateCourseResponse,
    UpdateCoursePayload,
    UpdateCourseResponse,
    CoursesResponse,
    UserCoursePayload
} from "./types";

import { generateRequest } from '../transportLayer';

class Course {
    async createCourse(courseParams: CreateCoursePayload): Promise<CreateCourseResponse> {
        try {
            return await generateRequest({ type: 'post', url: '/course/create', token: `${courseParams.token}`, body: { name: courseParams.name } });
        } catch (error) {
            throw error
        }
    }

    async getCourse(courseParams: GetCoursePayload): Promise<GetCourseResponse> {
        try {
            return await generateRequest({ type: 'get', url: `/course/${courseParams.id}`, token: `${courseParams.token}` });
        } catch (error) {
            throw error
        }
    }

    async updateCourse(courseParams: UpdateCoursePayload): Promise<UpdateCourseResponse> {
        try {
            return await generateRequest({ type: 'put', url: `/course/${courseParams.id}`, token: `${courseParams.token}`, body: { name: courseParams.name } });
        } catch (error) {
            throw error
        }
    }

    async deleteCourse(courseParams: GetCoursePayload): Promise<string> {
        try {
            return await generateRequest({ type: 'delete', url: `/course/${courseParams.id}`, token: `${courseParams.token}` })
        } catch (error) {
            throw error
        }
    }

    async getUserCourses(courseParams: UserCoursePayload): Promise<CoursesResponse> {
        try {
            return await generateRequest({ type: 'get', url: '/courses', token: `${courseParams.token}` });
        } catch (error) {
            throw error
        }
    }
}

export default Course