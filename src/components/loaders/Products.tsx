import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export default function ProductListLoading() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <Card key={i} className="flex flex-col overflow-hidden animate-pulse">
          <div className="aspect-square bg-muted" />
          <CardHeader className="flex-1 p-4">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="p-4">
            <Skeleton className="h-5 w-1/3" />
          </CardContent>
          <CardFooter className="flex gap-2 p-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-12" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
