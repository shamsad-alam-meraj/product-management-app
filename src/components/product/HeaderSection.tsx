'use client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Package, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function HeaderSection({ onEdit, onDelete }: HeaderProps) {
  const router = useRouter();
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-4 gap-4 sm:gap-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-4 w-full sm:w-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/products')}
            className="self-start sm:self-auto"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary flex-shrink-0">
              <Package className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold truncate">Product Details</h1>
              <p className="text-sm text-muted-foreground truncate">
                View complete product information
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-start sm:justify-end w-full sm:w-auto">
          <Button variant="outline" size="sm" onClick={onEdit} className="flex-1 sm:flex-none">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
            className="flex-1 sm:flex-none"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </header>
  );
}
