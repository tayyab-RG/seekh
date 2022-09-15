export interface reqPayload {
    type: string,
    url: string,
    body?: any,
    token?: any,
    headers?: any
}

export interface TransportParams {
    token: string,
    headers?: any
}