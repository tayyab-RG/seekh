export interface EnrollCoursePayload {
    courseId: string,
    token: string
}

export interface RequestsPayload {
    token: string
}

export interface RequestsResponse {
    enrollments: [
        {
            userName: string,
            userId: string,
            courseName: string,
            courseId: string,
            status: string
        }
    ]
}

export interface UpdateEnrollmentPayload {
    request: string,
    userId: string,
    courseId: string,
    token: string
}

export interface EnrollmentsResponse {
    enrollments: [
        {
            status: string,
            instructor: string,
            course: string
        }
    ]
}