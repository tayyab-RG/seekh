import React, { useContext, useEffect, useState } from 'react';
import { authContextType } from "./types";

const authContextDefaultValues: authContextType = {
    userToken: "",
    userId: '',
    loading: false,
    login: (token: string, id: string) => { },
    logout: () => { },
};

const AuthContext = React.createContext(authContextDefaultValues);

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: any) => {
    const [userToken, setUserToken] = useState("")
    const [userId, setUserId] = useState("")
    const [loading, setLoading] = useState(true)

    const logout = () => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_id');
        setUserToken("");
        setUserId("");
        setLoading(false);
    }

    const login = (token: string, id: string) => {
        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user_id', id);
        setUserId(id);
        setUserToken(token);
        setLoading(false);
    }

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        const id = localStorage.getItem('user_id');
        setUserToken(token ? token : "");
        setUserId(id ? id : '');
        setLoading(false);
    });

    return <AuthContext.Provider value={{ userId, userToken, login, logout, loading }}>{children}</AuthContext.Provider>
}