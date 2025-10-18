'use client';
import thumbnail from '@/assets/images/thumbnail.png';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Edit, Eye, Package, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ProductListLoading from '../loaders/Products';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  category: { id: string; name: string };
  images: string[];
}

interface GridProps {
  products: Product[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  debouncedSearchQuery: string;
  onPageChange: (page: number) => void;
  onDelete: (id: string) => void;
}

export default function ProductsGridSection({
  products,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onDelete,
  debouncedSearchQuery,
}: GridProps) {
  const router = useRouter();

  if (loading) return <ProductListLoading />;

  if (products.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Package className="mb-4 h-16 w-16 text-muted-foreground" />
        <h3 className="mb-2 text-xl font-semibold">No products found</h3>
        <Button onClick={() => router.push('/products/create')}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
    );

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => {
          const image =
            product.images && product.images[0] && product.images[0].trim() !== ''
              ? product.images[0]
              : thumbnail;
          return (
            <Card
              key={product.id}
              className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg"
            >
              <div className="aspect-square overflow-hidden bg-muted relative">
                <Image
                  src={image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  unoptimized
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = thumbnail.src;
                  }}
                />
              </div>
              <CardHeader className="flex-1">
                <CardTitle className="line-clamp-1 text-lg">{product.name}</CardTitle>
                <CardDescription className="line-clamp-2">{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">${product.price}</span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    {product.category.name}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => router.push(`/products/${product.slug}`)}
                >
                  <Eye className="mr-2 h-4 w-4" /> View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => router.push(`/products/edit/${product.slug}`)}
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(product.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Pagination */}
      {!debouncedSearchQuery && (
        <div className="mt-8 flex items-center justify-between w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage + 1)}>
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
}
