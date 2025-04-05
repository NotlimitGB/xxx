import { jwtDecode } from "jwt-decode";
import { useAppContext } from "../App";
import instance from "./instance";
import { useMutation, useQuery } from "@tanstack/react-query";
// ------------------------------------------------------------------------------------------------------
// Регестрация пользователя

export function useCreateUser() {
  return useMutation({
    mutationFn: async (body) => {
      try {
        const result = await instance().post(`/auth/register`, body);
        return result.data;
      } catch (error) {
        throw error.response?.data?.message || error;
      }
    },
  });
}

// ------------------------------------------------------------------------------------------------------
// авторизация пользователя

export function useAuthUser() {
  const { data, setData } = useAppContext();
  return useMutation({
    mutationFn: async (body) => {
      try {
        const result = await instance().post(`/auth/login`, body);
        return result.data;
      } catch (error) {
        throw error.response?.data?.message || error;
      }
    },
    onSuccess: (response) => {
      const decoded = jwtDecode(response.accessToken);
      console.log(decoded);
      setData({
        ...data,
        token: response.accessToken,
        id: decoded.id,
        role: decoded.role,
      });
    },
  });
}

// ------------------------------------------------------------------------------------------------------
// получение информации о текущем пользователе
