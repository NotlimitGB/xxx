import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../App';
import instance from '../instance';
import { useMutation, useQuery } from '@tanstack/react-query';

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
          navigate('/login');
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
          navigate('/login');
        }
        throw error;
      }
    },
  });
}

// ------------------------------------------------------------------------------------------------------
// Загрузить аватар юзера

export function useUploadUserAvatar() {
  const { data, setData } = useAppContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (file) => {
      try {
        // Создаем FormData (даже если она пустая или содержит поля)
        const formData = new FormData();
        // Пример: если нужно добавить поле
        formData.append('avatar', file);

        const result = await instance(data.token).post(`/user/upload-avatar`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Указываем тип контента
          },
        });

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

// Рефрештокена

export function useTokenRefresh() {
  const { data, setData } = useAppContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (file) => {
      try {
        // Создаем FormData (даже если она пустая или содержит поля)
        const formData = new FormData();
        // Пример: если нужно добавить поле
        formData.append('avatar', file);

        const result = await instance(data.token).post(`/auth/refresh-token`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Указываем тип контента
          },
        });

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
