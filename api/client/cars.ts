import { Car } from "../types";
import { axiosInstance } from "./axiosInstance";

export interface CarsResponse {
    items: Car[]
}

export const carsApi = {
    get: async (): Promise<CarsResponse> => {
        const { data } = await axiosInstance.get<CarsResponse>('/api/cars');

        return data;
    }
}