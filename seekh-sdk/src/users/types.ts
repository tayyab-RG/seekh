export interface UserResponse {
    data: {
        id: string,
        name: string,
        email: string
    }
}

export interface AuthPayload {
    token: string
}

export interface getUserPayload {
    id: string,
    token: string
}

export interface updateUserPayload {
    id: string,
    token: string,
    name?: string,
    email?: string,
    password?: string
}