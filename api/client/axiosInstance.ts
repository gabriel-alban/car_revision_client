import axios from "axios";
import { getAuthToken } from "@/utils/getAuthToken";

export const axiosInstance = axios.create({
	withCredentials: true,
	baseURL: process.env.NEXT_PUBLIC_URL,
	headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
	const token = getAuthToken();

	if (token) {
		config.headers.set('Authorization', `Bearer ${token}`);
	}

	return config;
})