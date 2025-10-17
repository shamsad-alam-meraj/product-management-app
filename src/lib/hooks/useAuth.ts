import type { AuthResponse } from '@/lib/api/types';
import { useMutation } from '@tanstack/react-query';
import apiClient from '../api/apiClient';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await apiClient.post<AuthResponse>('/auth', { email });
      return response.data;
    },
  });
};
