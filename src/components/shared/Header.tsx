'use client';
import { Button } from '@/components/ui/button';
import { logout } from '@/lib/features/auth/authSlice';
import { useAppDispatch } from '@/lib/hooks';
import { LogOut, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Package className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Product Management</h1>
            <p className="text-sm text-muted-foreground">Manage your inventory</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
