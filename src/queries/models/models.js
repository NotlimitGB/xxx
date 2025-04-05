import { useAppContext } from "../../App";
import instance from "../instance";
import { useMutation, useQuery } from "@tanstack/react-query";
// ------------------------------------------------------------------------------------------------------
// Получить всех моделей
export function useGetAllModels() {
  const { data, setData } = useAppContext();

  return useQuery({
    queryKey: ["all-models"],
    queryFn: async () => {
      try {
        const result = await instance(data.token).get(`/contractor`);

        return result.data;
      } catch (error) {
        throw error;
      }
    },
  });
}

// ------------------------------------------------------------------------------------------------------
// Модель по ID
export function useGetIDModel(id) {
  return useQuery({
    queryKey: [`id-model-${id}`],
    queryFn: async () => {
      try {
        const result = await instance.get(`/contractor/${id}`);

        return result.data;
      } catch (error) {
        throw error;
      }
    },
  });
}

// ------------------------------------------------------------------------------------------------------
// создать модель

export function useCreateModel() {
  return useMutation({
    mutationFn: async (body) => {
      try {
        const result = await instance.post(`/contractor`, body);
        return result.data;
      } catch (error) {
        throw error;
      }
    },
  });
}
