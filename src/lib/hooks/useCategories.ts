import type { Category } from '@/lib/api/types';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/apiClient';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await apiClient.get<Category[]>('/categories');
      return response.data;
    },
    staleTime: 30 * 60 * 1000,
  });
};
