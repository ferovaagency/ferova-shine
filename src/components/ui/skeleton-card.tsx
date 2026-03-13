import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonBlogCard = () => (
  <div className="glass-card p-6 md:p-8 space-y-4">
    <div className="flex items-center gap-3">
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-4 w-20" />
    </div>
    <Skeleton className="h-7 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-2/3" />
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-20" />
    </div>
  </div>
);

export const SkeletonResourceCard = () => (
  <div className="glass-card p-6 space-y-4">
    <div className="flex items-start justify-between">
      <Skeleton className="h-10 w-10 rounded" />
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
    <Skeleton className="h-5 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-2/3" />
    <Skeleton className="h-12 w-full rounded-full" />
  </div>
);
