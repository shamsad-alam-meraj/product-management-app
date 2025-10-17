import type { Product, ProductsResponse } from '@/lib/api/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/apiClient';

export const useProducts = (offset = 0, limit = 10, categoryId?: string) => {
  return useQuery({
    queryKey: ['products', offset, limit, categoryId],
    queryFn: async () => {
      const params = new URLSearchParams({
        offset: offset.toString(),
        limit: limit.toString(),
      });
      if (categoryId) params.append('categoryId', categoryId);
      const response = await apiClient.get<ProductsResponse>(`/products?${params.toString()}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useSearchProducts = (searchText: string) => {
  return useQuery({
    queryKey: ['products', 'search', searchText],
    queryFn: async () => {
      const response = await apiClient.get<Product[]>(
        `/products/search?searchedText=${encodeURIComponent(searchText)}`
      );
      return response.data;
    },
    enabled: searchText.length > 0,
    staleTime: 3 * 60 * 1000,
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['products', slug],
    queryFn: async () => {
      const response = await apiClient.get<Product>(`/products/${slug}`);
      return response.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productData: {
      name: string;
      description: string;
      images: string[];
      price: number;
      categoryId: string;
    }) => {
      const response = await apiClient.post<Product>('/products', productData);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, productData }: { id: string; productData: Partial<Product> }) => {
      const response = await apiClient.put<Product>(`/products/${id}`, productData);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['products', data.slug], data);
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/products/${id}`);
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
};
