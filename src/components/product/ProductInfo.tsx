'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Package, Tag } from 'lucide-react';
import Image from 'next/image';

interface Category {
  name: string;
  image?: string;
  description?: string;
}

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    price: number;
    slug: string;
    description: string;
    category: Category;
    createdAt: string;
    updatedAt: string;
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-3 flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            <Tag className="mr-1 h-3 w-3" />
            {product.category.name}
          </Badge>
        </div>
        <h2 className="mb-4 text-3xl font-bold leading-tight text-balance">{product.name}</h2>
        <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
      </div>

      {/* Description */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-3 text-lg font-semibold">Description</h3>
          <p className="leading-relaxed text-muted-foreground text-pretty">{product.description}</p>
        </CardContent>
      </Card>

      {/* Product Information */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-semibold">Product Information</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Package className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Product ID</p>
                <p className="text-sm text-muted-foreground">{product.id}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Tag className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Slug</p>
                <p className="text-sm text-muted-foreground">{product.slug}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Created</p>
                <p className="text-sm text-muted-foreground">{formatDate(product.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-sm text-muted-foreground">{formatDate(product.updatedAt)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Details */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-semibold">Category Details</h3>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-lg bg-muted relative">
              <Image
                src={product.category.image || '/placeholder.svg?height=64&width=64'}
                alt={product.category.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <p className="font-medium">{product.category.name}</p>
              {product.category.description && (
                <p className="text-sm text-muted-foreground">{product.category.description}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
