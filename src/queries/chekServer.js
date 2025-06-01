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
        const result = await instance().get(`/`);

        return result;
      } catch (error) {
        navigate('/server-status');

        throw error;
      }
    },
  });
}
