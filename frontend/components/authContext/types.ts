export type authContextType = {
    userToken: string
    userId: string
    loading: boolean
    login: (token: string, id: string) => void,
    logout: () => void,
};