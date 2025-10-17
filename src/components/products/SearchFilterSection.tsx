'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategoryId: string | null;
  categories: { id: string; name: string }[];
  onCategoryChange: (id: string) => void;
}

export default function SearchFilterSection({
  searchQuery,
  setSearchQuery,
  selectedCategoryId,
  categories,
  onCategoryChange,
}: SearchFilterProps) {
  const router = useRouter();

  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedCategoryId || 'all'} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={() => router.push('/products/create')}>
        <Plus className="mr-2 h-4 w-4" /> Add Product
      </Button>
    </div>
  );
}
