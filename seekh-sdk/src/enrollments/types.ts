export interface EnrollCoursePayload {
    courseId: string,
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
    user: string,
    course: string,
}

export interface EnrollmentsResponse {
    enrollments: [
        {
            status: string,
            instructor: string,
            course: string,
            id: string
        }
    ]
}