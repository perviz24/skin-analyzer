import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <Skeleton className="mx-auto mb-4 h-10 w-64" />
      <Skeleton className="mx-auto mb-8 h-5 w-96" />
      <div className="grid gap-6 md:grid-cols-3">
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    </div>
  );
}
