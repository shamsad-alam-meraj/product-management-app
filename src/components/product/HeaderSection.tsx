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
          <Button variant="outline" onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </header>
  );
}
