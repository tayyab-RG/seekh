import React, { useContext, useEffect, useState } from 'react';
import { authContextType } from "./types";

const authContextDefaultValues: authContextType = {
    user: "",
    setUser: (userId: string) => { },
    logout: () => { }
};

export const AuthContext = React.createContext(authContextDefaultValues);

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState("")

    const logout = () => {
        localStorage.removeItem('jwt_token');
        setUser("");
    }

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        setUser(token ? token : "");
    });

    return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>
}