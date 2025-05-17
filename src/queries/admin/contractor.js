import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../App';
import instance from '../instance';
import { useMutation, useQuery } from '@tanstack/react-query';

// Получить всех юзеров
export function useGetAllContractorsAncet() {
  const navigate = useNavigate();
  const { data, setData } = useAppContext();

  return useQuery({
    queryKey: ['all-models'],
    queryFn: async () => {
      try {
        const result = await instance(data.token).get(`/admin/contractor/list`);

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
export function useAcceptContractor() {
  const { data, setData } = useAppContext();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ contractor_id }) => {
      try {
        const result = await instance(data.token).put(`/admin/contractor/accept/${contractor_id}`);
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
