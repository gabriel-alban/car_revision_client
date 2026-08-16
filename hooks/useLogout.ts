"use client"

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useCallback } from "react"
import { useAuth } from "./useAuth";

export const useLogout = () => {
    const router = useRouter();
    const { setIsLoggedIn } = useAuth();

    const logout = useCallback(async () => {
        await fetch('/api/auth/logout', {method: 'POST'});
        deleteCookie('access_token');
        setIsLoggedIn(false);
        router.push("/login");
        router.refresh();
    }, []);

    return {logout}
}