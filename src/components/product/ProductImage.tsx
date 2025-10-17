'use client';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface ProductImageProps {
  imageUrl: string;
  name: string;
}

export default function ProductImage({ imageUrl, name }: ProductImageProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden bg-muted relative">
          <Image
            src={imageUrl || '/placeholder.svg?height=600&width=600'}
            alt={name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </CardContent>
    </Card>
  );
}
