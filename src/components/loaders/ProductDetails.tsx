import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export default function ProductDetailLoading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-square overflow-hidden bg-muted relative">
                <Skeleton className="h-full w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div className="mb-3">
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>

            {/* Product Name */}
            <Skeleton className="h-10 w-3/4 rounded-md" />

            {/* Product Price */}
            <Skeleton className="h-8 w-32 rounded-md" />

            {/* Description Card */}
            <Card>
              <CardContent className="pt-6">
                <Skeleton className="h-6 w-32 mb-3 rounded-md" /> {/* Description heading */}
                <Skeleton className="h-4 w-full mb-2 rounded-md" />
                <Skeleton className="h-4 w-full mb-2 rounded-md" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
              </CardContent>
            </Card>

            {/* Product Information Card */}
            <Card>
              <CardContent className="pt-6 space-y-3">
                {Array(4)
                  .fill(0)
                  .map((_, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <div className="flex-1 space-y-1">
                        <Skeleton className="h-3 w-24 rounded-md" />
                        <Skeleton className="h-3 w-32 rounded-md" />
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Category Details Card */}
            <Card>
              <CardContent className="pt-6 flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32 rounded-md" />
                  <Skeleton className="h-3 w-48 rounded-md" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
