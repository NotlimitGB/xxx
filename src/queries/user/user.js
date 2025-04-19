import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../App";
import instance from "../instance";
import { useMutation, useQuery } from "@tanstack/react-query";

// ------------------------------------------------------------------------------------------------------
// Получить Свой профель
export function useGetProfile() {
  const { data, setData } = useAppContext();
  const navigate = useNavigate();

  return useQuery({
    queryKey: [`profile-${data.id}`],
    queryFn: async () => {
      try {
        const result = await instance(data.token).get(`/user/profile`);

        return result.data;
      } catch (error) {
        if (error.response?.status === 401) {
          setData({});
          navigate("/login");
        }
        throw error;
      }
    },
  });
}

// ------------------------------------------------------------------------------------------------------
// Стать исполнителем

export function useBeContractor() {
  const { data, setData } = useAppContext();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      try {
        const result = await instance(data.token).post(`/contractor/become`);
        return result.data;
      } catch (error) {
        if (error.response?.status === 401) {
          setData({});
          navigate("/login");
        }
        throw error;
      }
    },
  });
}
