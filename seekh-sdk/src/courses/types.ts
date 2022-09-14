export interface GetCoursePayload {
    id: string,
    token: string
}

export interface GetCourseResponse {
    courseName: string,
    instructorName: string
}

export interface CreateCoursePayload {
    name: string,
    token: string
}

export interface CreateCourseResponse {
    courseName: string,
    courseId: string,
    instructorId: string
}

export interface UpdateCoursePayload {
    id: string,
    name: string,
    token: string
}

export interface UpdateCourseResponse {
    courseName: string,
    instructorName: string
}

export interface CoursesResponse {
    courses: [
        {
            id: string,
            name: string,
            instructor: string
        }
    ]
}

export interface UserCoursePayload {
    token: string
}