import instance from "../instance";
import { useQuery } from "@tanstack/react-query";
// ------------------------------------------------------------------------------------------------------
// Получить всех моделей
export function useGetAllModels() {

    return useQuery({
        queryKey: ["all-models"],
        queryFn: async () => {
            try {
                const result =  await instance.get(`/models`);

                return result.data;

            } catch (error) {
                throw error;
            }
        },
    });
}

// ------------------------------------------------------------------------------------------------------
// Модель по ID
export function useGetIDModel( id ) {

    return useQuery({
        queryKey: [`id-model-${id}`],
        queryFn: async () => {
            try {
                const result =  await instance.get(`/models/${id}`);

                return result.data;
            } catch (error) {
                throw error;
            }
        },
    });
}