'use client';
import ProductDetailLoading from '@/components/loaders/ProductDetails';
import HeaderSection from '@/components/product/HeaderSection';
import ProductImage from '@/components/product/ProductImage';
import ProductInfo from '@/components/product/ProductInfo';
import DeleteDialog from '@/components/shared/DeleteDialog';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/lib/hooks';
import { useDeleteProduct, useProductBySlug } from '@/lib/hooks/useProducts';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const slug = params.slug as string;
  const { data: currentProduct, isLoading } = useProductBySlug(slug);
  const deleteProductMutation = useDeleteProduct();

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
  }, [isAuthenticated, router]);

  const handleDeleteClick = () => setDeleteDialogOpen(true);

  const handleDeleteConfirm = async () => {
    if (currentProduct) {
      try {
        await deleteProductMutation.mutateAsync(currentProduct.id);
        toast.success('Product deleted successfully');
        router.push('/products');
      } catch {
        toast.error('Failed to delete product');
      }
    }
  };

  const handleEdit = () => {
    if (currentProduct) router.push(`/products/edit/${currentProduct.id}`);
  };

  if (!isAuthenticated) return null;
  if (isLoading) return <ProductDetailLoading />;

  if (!currentProduct)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold">Product not found</p>
          <Button className="mt-6" onClick={() => router.push('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-background font-inter">
      <HeaderSection onEdit={handleEdit} onDelete={handleDeleteClick} />
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <ProductImage imageUrl={currentProduct.images[0]} name={currentProduct.name} />
            <ProductInfo product={currentProduct} />
          </div>
        </div>
      </main>
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onDeleteConfirm={handleDeleteConfirm}
        productName={currentProduct.name}
      />
    </div>
  );
}
