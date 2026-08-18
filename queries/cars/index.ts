import { carsApi } from "@/api/client/cars"
import { queryOptions } from "@tanstack/react-query"

export const carsQueries = {
    useList: () => {
        return queryOptions({
            queryKey: ['car'],
            queryFn: async () => {
                return await carsApi.get();
            }
        })
    }
}