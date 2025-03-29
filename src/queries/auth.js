import instance from "./instance";
import { useMutation, useQuery } from "@tanstack/react-query";
// ------------------------------------------------------------------------------------------------------
// Регестрация пользователя

export function useCreateUser() {
    return useMutation({
      mutationFn: async (body) => {
        try {
          const result = await instance.post(`/auth/register`, body);
          return result.data;
        } catch (error) {
          throw error;
        }
      },
    });
  }

  // ------------------------------------------------------------------------------------------------------
// авторизация пользователя

export function useAuthUser() {
    return useMutation({
      mutationFn: async (body) => {
        try {
          const result = await instance.post(`/auth/login`, body);
          return result.data;
        } catch (error) {
          throw error;
        }
      },
    });
  }
