import instance from "../instance";
import { useQuery } from "@tanstack/react-query";
// ------------------------------------------------------------------------------------------------------
// Получить всех моделей
export function useGetAllModels() {

    return useQuery({
        queryKey: ["all-models"],
        queryFn: async () => {
            try {
                return await instance.get('/models/');
            } catch (error) {
                throw error;
            }
        },
    });
}

// ------------------------------------------------------------------------------------------------------
// Модель по ID
export function useGetIDModel() {

    return useQuery({
        queryKey: ["id-model"],
        queryFn: async () => {
            try {
                return await instance.get('/models/{ID}');
            } catch (error) {
                throw error;
            }
        },
    });
}