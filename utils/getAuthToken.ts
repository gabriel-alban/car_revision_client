import { getCookie } from "cookies-next/client"

export const getAuthToken = () => {
    return getCookie("access_token");
}
