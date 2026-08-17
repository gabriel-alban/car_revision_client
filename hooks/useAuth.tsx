"use client"

import { getAuthToken } from "@/utils/getAuthToken";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState, ReactNode, useContext } from "react"
import { deleteCookie } from "cookies-next";
import { useTokenExpiration } from "./useTokenExpiration";

type AuthContextValue = {
    isLoggedIn: boolean | null;
    setIsLoggedIn: (value: boolean) => void
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const router = useRouter();
    const expiresAt = useTokenExpiration();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

    useEffect(() => {
        setIsLoggedIn(Boolean(getAuthToken()))
    }, [])

    useEffect(() => {
        if (!expiresAt) return;
        const timeUntilExpiry = expiresAt - Date.now();

        const logout = () => {
            setIsLoggedIn(false);
            deleteCookie("access_token", { path: "/" });
            router.push("/login");
        };

        if (timeUntilExpiry <= 0) {
            logout();
            return;
        }

        const timeoutId = window.setTimeout(logout, timeUntilExpiry);

        return () => window.clearTimeout(timeoutId);
    }, [setIsLoggedIn, router, expiresAt])

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