'use client';
import ProductsGridSection from '@/components/products/ProductsGridSection';
import SearchFilterSection from '@/components/products/SearchFilterSection';
import DeleteDialog from '@/components/shared/DeleteDialog';
import Header from '@/components/shared/Header';
import { useDebounce } from '@/hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useCategories } from '@/lib/hooks/useCategories';
import { useDeleteProduct, useProducts, useSearchProducts } from '@/lib/hooks/useProducts';
import { useState } from 'react';
import { toast } from 'react-toastify';

const LIMIT = 20;

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const offset = (currentPage - 1) * LIMIT;

  const {
    data: productsData,
    isLoading: productsLoading,
    refetch,
  } = useProducts(offset, LIMIT, selectedCategoryId || undefined);
  const { data: searchData, isLoading: searchLoading } = useSearchProducts(debouncedSearchQuery);
  const { data: categoriesData } = useCategories();
  const deleteProductMutation = useDeleteProduct();

  const products = debouncedSearchQuery ? searchData || [] : productsData || [];
  const categories = categoriesData || [];
  const loading = debouncedSearchQuery ? searchLoading : productsLoading;

  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    try {
      await deleteProductMutation.mutateAsync(productToDelete);
      toast.success('Product deleted successfully');
      setDeleteDialogOpen(false);
      setProductToDelete(null);
      refetch();
    } catch {
      toast.error('Failed to delete product');
    }
  };

  const totalPages = Math.ceil((productsData?.length || 0) / LIMIT);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background font-inter">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SearchFilterSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategoryId={selectedCategoryId}
          categories={categories}
          onCategoryChange={setSelectedCategoryId}
        />
        <ProductsGridSection
          products={products}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onDelete={handleDeleteClick}
          debouncedSearchQuery={debouncedSearchQuery}
        />
      </main>
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onDeleteConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
