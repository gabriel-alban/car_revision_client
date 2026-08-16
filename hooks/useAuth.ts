import { getAuthToken } from "@/utils/getAuthToken";
import { useEffect, useState } from "react"

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        setIsLoggedIn(Boolean(getAuthToken()));
    }, [])

    return { isLoggedIn }
}