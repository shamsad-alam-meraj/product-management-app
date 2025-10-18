'use client';

import thumbnail from '@/assets/images/thumbnail.png';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Product } from '@/lib/api/types';
import { useCategories } from '@/lib/hooks/useCategories';
import { useCreateProduct, useUpdateProduct } from '@/lib/hooks/useProducts';
import { ArrowLeft, Package } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface ProductFormProps {
  mode: 'create' | 'edit';
  product?: Product;
}

interface FormData {
  name: string;
  description: string;
  price: string;
  images: string;
  categoryId: string;
}

interface FormErrors {
  name?: string;
  description?: string;
  price?: string;
  images?: string;
  categoryId?: string;
}

export default function ProductForm({ mode, product }: ProductFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price?.toString() || '',
    images: product?.images?.[0] || '',
    categoryId: product?.category?.id || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const { data: categories = [] } = useCategories();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();

  const loading = createProductMutation.isPending || updateProductMutation.isPending;

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Product name is required';
        if (value.trim().length < 3) return 'Product name must be at least 3 characters';
        return undefined;

      case 'description':
        if (!value.trim()) return 'Description is required';
        if (value.trim().length < 10) return 'Description must be at least 10 characters';
        return undefined;

      case 'price':
        if (!value) return 'Price is required';
        const priceNum = Number.parseFloat(value);
        if (isNaN(priceNum)) return 'Price must be a valid number';
        if (priceNum <= 0) return 'Price must be greater than 0';
        return undefined;

      case 'images':
        if (!value.trim()) return 'Image URL is required';
        try {
          new URL(value);
          return undefined;
        } catch {
          return 'Please enter a valid URL';
        }

      case 'categoryId':
        if (!value) return 'Category is required';
        return undefined;

      default:
        return undefined;
    }
  };

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key as keyof FormData, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      description: true,
      price: true,
      images: true,
      categoryId: true,
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.success('Please fix all errors before submitting');
      return;
    }

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number.parseFloat(formData.price),
        images: [formData.images.trim()],
        categoryId: formData.categoryId,
      };

      if (mode === 'create') {
        await createProductMutation.mutateAsync(productData);
        toast.success('Product created successfully');
      } else if (product) {
        await updateProductMutation.mutateAsync({ id: product.id, productData });
        toast.success('Product updated successfully');
      }

      router.push('/products');
    } catch (error) {
      toast.error(`Failed to ${mode} product`);
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/products')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Package className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                {mode === 'create' ? 'Create Product' : 'Edit Product'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {mode === 'create'
                  ? 'Add a new product to your inventory'
                  : 'Update product information'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="container mx-auto px-4 py-8">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
            <CardDescription>Fill in the details below to {mode} a product</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Product Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  className={errors.name && touched.name ? 'border-destructive' : ''}
                />
                {errors.name && touched.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  onBlur={() => handleBlur('description')}
                  className={errors.description && touched.description ? 'border-destructive' : ''}
                  rows={4}
                />
                {errors.description && touched.description && (
                  <p className="text-sm text-destructive">{errors.description}</p>
                )}
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">
                  Price <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    onBlur={() => handleBlur('price')}
                    className={`pl-7 ${errors.price && touched.price ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.price && touched.price && (
                  <p className="text-sm text-destructive">{errors.price}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) => handleChange('categoryId', value)}
                >
                  <SelectTrigger
                    id="category"
                    className={errors.categoryId && touched.categoryId ? 'border-destructive' : ''}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categoryId && touched.categoryId && (
                  <p className="text-sm text-destructive">{errors.categoryId}</p>
                )}
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="images">
                  Image URL <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="images"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.images}
                  onChange={(e) => handleChange('images', e.target.value)}
                  onBlur={() => handleBlur('images')}
                  className={errors.images && touched.images ? 'border-destructive' : ''}
                />
                {errors.images && touched.images && (
                  <p className="text-sm text-destructive">{errors.images}</p>
                )}
                {!errors.images && (
                  <div className="mt-4 overflow-hidden rounded-lg border relative h-48 w-full">
                    <Image
                      src={
                        formData.images && formData.images.trim() !== ''
                          ? formData.images
                          : thumbnail
                      }
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = thumbnail.src;
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/products')}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      {mode === 'create' ? 'Creating...' : 'Updating...'}
                    </div>
                  ) : mode === 'create' ? (
                    'Create Product'
                  ) : (
                    'Update Product'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
