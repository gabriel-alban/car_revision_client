import { Car } from "../types";
import { axiosInstance } from "./axiosInstance";

export interface CarsResponse {
    items: Car[]
}

export const carsApi = {
    get: async (): Promise<CarsResponse> => {
        const { data } = await axiosInstance.get(`${process.env.NEXT_PUBLIC_URL}/api/cars`);

        return data;
    }
}