import {
    EnrollCoursePayload,
    RequestsResponse,
    UpdateEnrollmentPayload,
    EnrollmentsResponse
} from "./types";

import { generateRequest } from '../transportLayer';
import { TransportParams } from "../transportLayer/types";

class Enrollment {
    private trasnsportParams: TransportParams = { token: "" };

    setTransportParams(trasnsportParams: TransportParams) {
        this.trasnsportParams = trasnsportParams;
    }

    async enrollCourse(enrollParams: EnrollCoursePayload): Promise<String> {
        try {
            return await generateRequest({ type: 'post', url: `/enroll/${enrollParams.courseId}`, token: this.trasnsportParams.token, headers: this.trasnsportParams.headers });
        } catch (error) {
            throw error
        }
    }

    async enrollmentRequests(): Promise<RequestsResponse> {
        try {
            return await generateRequest({ type: 'get', url: '/requests', token: this.trasnsportParams.token, headers: this.trasnsportParams.headers });
        } catch (error) {
            throw error
        }
    }

    async updateEnrollment(updateParams: UpdateEnrollmentPayload): Promise<string> {
        try {
            return await generateRequest({ type: 'post', url: `/${updateParams.request}/${updateParams.course}/${updateParams.user}`, token: this.trasnsportParams.token, headers: this.trasnsportParams.headers });
        } catch (error) {
            throw error
        }
    }

    async getEnrollments(): Promise<EnrollmentsResponse> {
        try {
            return await generateRequest({ type: 'get', url: '/enrollments', token: this.trasnsportParams.token, headers: this.trasnsportParams.headers });
        } catch (error) {
            throw error
        }
    }
}

export default Enrollment