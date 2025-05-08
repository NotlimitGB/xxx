import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../App';
import instance from '../instance';
import { useMutation, useQuery } from '@tanstack/react-query';
// ------------------------------------------------------------------------------------------------------
// Получить всех моделей
export function useGetAllContractors(filters) {
  const navigate = useNavigate();
  const { data, setData } = useAppContext();

  return useQuery({
    queryKey: ['all-models', filters],
    queryFn: async () => {
      try {
        const result = await instance(data.token).post(`/contractor/list`, {
          filters,
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
// Получить список квалификаций
export function useGetAllQualifications() {
  const { data, setData } = useAppContext();
  const navigate = useNavigate();
  return useQuery({
    queryKey: [`list-qualifications`],
    queryFn: async () => {
      try {
        const result = await instance(data.token).get(`/qualifications`);

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

// ------------------------------------------------------------------------------------------------------
// Загрузить аватар исполнителя

export function useUploadContarctorAvatar() {
  const { data, setData } = useAppContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ file, id }) => {
      try {
        // Создаем FormData (даже если она пустая или содержит поля)
        const formData = new FormData();
        // Пример: если нужно добавить поле
        formData.append('images', file);

        const result = await instance(data.token).post(
          `/contractor/${id}/upload_images`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Указываем тип контента
            },
          }
        );

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
// Удалить фото исполнителя

export function useRemoveImageContractor() {
  const { data, setData } = useAppContext();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ id, imageUrl }) => {
      try {
        const result = await instance(data.token).delete(`/contractor/${id}/remove-image`, {
          data: {
            imageUrl: imageUrl,
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

// ------------------------------------------------------------------------------------------------------
// Связатся с исполнителем

export function useSendContractorMessage() {
  const { data, setData } = useAppContext();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (body) => {
      try {
        const result = await instance(data.token).post(`/contractor/message`, {
          ...body,
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
