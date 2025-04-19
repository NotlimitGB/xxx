import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../App';
import instance from '../instance';
import { useMutation, useQuery } from '@tanstack/react-query';
// ------------------------------------------------------------------------------------------------------
// Получить всех моделей
export function useGetAllContractors() {
  const navigate = useNavigate();
  const { data, setData } = useAppContext();

  return useQuery({
    queryKey: ['all-models'],
    queryFn: async () => {
      try {
        const result = await instance(data.token).get(`/contractor`);

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

// ------------------------------------------------------------------------------------------------------
// Модель по ID
export function useGetIDContractor(id) {
  const { data, setData } = useAppContext();
  const navigate = useNavigate();
  return useQuery({
    queryKey: [`id-model-${id}`],
    queryFn: async () => {
      try {
        const result = await instance(data.token).get(`/contractor/${id}`);

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

// ------------------------------------------------------------------------------------------------------
// создать модель

export function useCreateContractor() {
  const { data, setData } = useAppContext();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (body) => {
      try {
        const result = await instance(data.token).post(`/contractor`, body);
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

// ------------------------------------------------------------------------------------------------------
// Изменить модель

export function useEditContractor() {
  const { data, setData } = useAppContext();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (body) => {
      try {
        const result = await instance(data.token).put(`/contractor`, body);
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
