export interface login {
    email: string,
    password: string
}

export interface signup {
    name: string,
    email: string,
    password: string
}

export interface AuthResponse {
    token: string,
    data: {
        id: string
    }
}