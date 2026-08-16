"use client"

import { getAuthToken } from "@/utils/getAuthToken";
import { createContext, useEffect, useState, ReactNode, useContext } from "react"

type AuthContextValue = {
    isLoggedIn: boolean | null;
    setIsLoggedIn: (value: boolean) => void
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

    useEffect(() => {
        setIsLoggedIn(Boolean(getAuthToken()))
    }, [])

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);

    if (!ctx) throw new Error('Auth context error');

    return ctx;
}