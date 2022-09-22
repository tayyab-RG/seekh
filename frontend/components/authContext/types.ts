export type authContextType = {
    user: string;
    setUser: (userId: string) => void,
    logout: () => void
};