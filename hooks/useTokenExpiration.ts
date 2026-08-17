import { getAuthToken } from "@/utils/getAuthToken"
import { jwtDecode } from 'jwt-decode';

export const useTokenExpiration= () => {
    const token = getAuthToken();
    
    if (!token) return undefined;

    const decoded = jwtDecode(token);
    
    if(!decoded.exp) return undefined;

    return decoded.exp * 1000;
}