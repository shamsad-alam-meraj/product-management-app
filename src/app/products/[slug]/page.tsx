'use client';

import ProductDetailLoading from '@/components/loaders/ProductDetails';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppSelector } from '@/lib/hooks';
import { useDeleteProduct, useProductBySlug } from '@/lib/hooks/useProducts';
import { ArrowLeft, Calendar, Edit, Package, Tag, Trash2 } from 'lucide-react';
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
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (currentProduct) {
      try {
        await deleteProductMutation.mutateAsync(currentProduct.id);
        toast.success('Product deleted successfully');

        router.push('/products');
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  const handleEdit = () => {
    if (currentProduct) {
      router.push(`/products/edit/${currentProduct.id}`);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return <ProductDetailLoading />;
  }

  if (!currentProduct) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Package className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="text-2xl font-bold">Product not found</h2>
          <p className="mt-2 text-muted-foreground">
            The product you're looking for doesn't exist.
          </p>
          <Button className="mt-6" onClick={() => router.push('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push('/products')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Package className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Product Details</h1>
                <p className="text-sm text-muted-foreground">View complete product information</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="destructive" onClick={handleDeleteClick}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Product Image */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={currentProduct.images[0] || '/placeholder.svg?height=600&width=600'}
                    alt={currentProduct.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Information */}
            <div className="space-y-6">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Badge variant="secondary" className="text-sm">
                    <Tag className="mr-1 h-3 w-3" />
                    {currentProduct.category.name}
                  </Badge>
                </div>
                <h2 className="mb-4 text-3xl font-bold leading-tight text-balance">
                  {currentProduct.name}
                </h2>
                <p className="text-4xl font-bold text-primary">
                  ${currentProduct.price.toFixed(2)}
                </p>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="mb-3 text-lg font-semibold">Description</h3>
                  <p className="leading-relaxed text-muted-foreground text-pretty">
                    {currentProduct.description}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="mb-4 text-lg font-semibold">Product Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Package className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Product ID</p>
                        <p className="text-sm text-muted-foreground">{currentProduct.id}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Tag className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Slug</p>
                        <p className="text-sm text-muted-foreground">{currentProduct.slug}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Created</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(currentProduct.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Last Updated</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(currentProduct.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="mb-4 text-lg font-semibold">Category Details</h3>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-lg bg-muted">
                      <img
                        src={currentProduct.category.image || '/placeholder.svg?height=64&width=64'}
                        alt={currentProduct.category.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{currentProduct.category.name}</p>
                      {currentProduct.category.description && (
                        <p className="text-sm text-muted-foreground">
                          {currentProduct.category.description}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete "{currentProduct.name}"
              from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
