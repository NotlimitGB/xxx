import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../App';
import instance from '../instance';
import { useMutation, useQuery } from '@tanstack/react-query';

// Получить всех юзеров
export function useGetAllUsers() {
  const navigate = useNavigate();
  const { data, setData } = useAppContext();

  return useQuery({
    queryKey: ['all-models'],
    queryFn: async () => {
      try {
        const result = await instance(data.token).get(`/admin/user/list`);

        return result.data;
      } catch (error) {
        if (error.response?.status === 401) {
          setData({});
          navigate('/login');
        }
        throw error;
      }
    },
  });
}

// Получить всех юзеров
export function usePutUserBan() {
  const { data, setData } = useAppContext();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ body, user_id }) => {
      try {
        console.log(body);

        const result = await instance(data.token).put(`/admin/user/ban/${user_id}`, body);
        return result.data;
      } catch (error) {
        if (error.response?.status === 401) {
          setData({});
          navigate('/login');
        }
        throw error;
      }
    },
  });
}
