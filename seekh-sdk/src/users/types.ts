export interface UserResponse {
    data: {
        id: string,
        name: string,
        email: string
    }
}

export interface getUserPayload {
    id: string,
}

export interface updateUserPayload {
    id: string,
    name?: string,
    email?: string,
    password?: string
}