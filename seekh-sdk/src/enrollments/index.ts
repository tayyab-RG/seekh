import {
    EnrollCoursePayload,
    RequestsPayload,
    RequestsResponse,
    UpdateEnrollmentPayload,
    EnrollmentsResponse
} from "./types";

import { generateRequest } from '../transportLayer';

class Enrollment {
    async enrollCourse(enrollParams: EnrollCoursePayload): Promise<String> {
        try {
            return await generateRequest({ type: 'post', url: `/enroll/${enrollParams.courseId}`, token: enrollParams.token });
        } catch (error) {
            throw error
        }
    }

    async enrollmentRequests(requestsParams: RequestsPayload): Promise<RequestsResponse> {
        try {
            return await generateRequest({ type: 'get', url: '/requests', token: requestsParams.token });
        } catch (error) {
            throw error
        }
    }

    async updateEnrollment(updateParams: UpdateEnrollmentPayload): Promise<string> {
        try {
            return await generateRequest({ type: 'post', url: `/${updateParams.request}/${updateParams.courseId}/${updateParams.userId}`, token: updateParams.token });
        } catch (error) {
            throw error
        }
    }

    async getEnrollments(enrollmentParams: RequestsPayload): Promise<EnrollmentsResponse> {
        try {
            return await generateRequest({ type: 'get', url: '/enrollments', token: enrollmentParams.token });
        } catch (error) {
            throw error
        }
    }
}

export default Enrollment