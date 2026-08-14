import { axiosInstance } from "./axiosInstance";

export const authApi = {
    login: async (payload: {email:string; password: string;}) => {
        const {data} = await axiosInstance.post(`${process.env.NEXT_PUBLIC_URL}/api/auth/login`, payload, {
            headers: { "Content-Type": "application/json" },
        });
    
        return data;
    }
}