import { useAppContext } from '../App';
import instance from './instance';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function useCheckConnection() {
  const navigate = useNavigate();

  return useQuery({
    queryKey: ['check-connection'],
    queryFn: async () => {
      try {
        // Установка таймаута в миллисекундах (например, 5000 = 5 секунд)
        const result = await instance().get(`/`, { timeout: 5000 });
        return result;
      } catch (error) {
        navigate('/server-status');
        throw error;
      }
    },
    // Опционально: устанавливаем общий таймаут для Query (в react-query v5)
    gcTime: 5000, // Время кэширования (старый 'cacheTime')
    staleTime: 5000, // Время "свежести" данных
  });
}
