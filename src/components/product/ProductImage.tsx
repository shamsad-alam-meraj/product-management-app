'use client';
import thumbnail from '@/assets/images/thumbnail.png';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface ProductImageProps {
  imageUrl?: string;
  name: string;
}

export default function ProductImage({ imageUrl, name }: ProductImageProps) {
  const src = imageUrl && imageUrl.trim() !== '' ? imageUrl : thumbnail.src;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden bg-muted relative">
          <Image
            src={src}
            alt={name}
            fill
            className="object-cover"
            unoptimized
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = thumbnail.src;
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
