'use client';

import ProductForm from '@/components/product/ProductForm';
import { useAppSelector } from '@/lib/hooks';
import { useProducts } from '@/lib/hooks/useProducts';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const productId = params.id as string;

  const { data: productsData, isLoading } = useProducts(0, 50);
  const products = productsData?.data || [];
  const product = products.find((p) => p.id === productId);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center font-inter">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <p className="mt-2 text-muted-foreground">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return <ProductForm mode="edit" product={product} />;
}
