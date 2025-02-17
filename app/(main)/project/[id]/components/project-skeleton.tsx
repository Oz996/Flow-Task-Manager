"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useViewMode } from "@/hooks/use-view-mode";

export default function ProjectSkeleton() {
  const { viewMode } = useViewMode();

  if (viewMode === "board") {
    return (
      <>
        <Skeleton className="h-7 w-32 mb-2" />
        <div className="flex flex-col border-t border-t-border pt-4">
          <div className="flex gap-5 items-center">
            <Skeleton className="h-10 w-20 rounded" />
            <Skeleton className="h-10 w-20 rounded" />
            <Skeleton className="h-10 w-20 rounded" />
          </div>
          <div className="flex gap-5 mt-5 pt-5 border-t border-t-border">
            {new Array(3).fill(0).map((_, index) => (
              <div key={index} className="min-w-[17.5rem]">
                <Skeleton className="h-5 w-24" />

                {new Array(2).fill(0).map((_, index) => (
                  <div key={index} className="pt-10">
                    <Skeleton className="flex flex-col gap-5 p-4 min-h-[8rem] rounded-lg" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (viewMode === "list") {
    return (
      <>
        <Skeleton className="h-7 w-32 mb-2" />
        <div className="flex flex-col border-t border-t-border pt-4">
          <div className="flex gap-5 items-center">
            <Skeleton className="h-10 w-20 rounded" />
            <Skeleton className="h-10 w-20 rounded" />
            <Skeleton className="h-10 w-20 rounded" />
          </div>
          <div className="mt-5 pt-5 border-t border-t-border">
            <Skeleton className="h-9 w-full my-3" />

            <div className="mb-10">
              <Skeleton className="h-6 w-24 mb-2" />
              {new Array(3).fill(0).map((_, index) => (
                <Skeleton key={index} className="h-9 w-full" />
              ))}
            </div>

            <div className="mb-10">
              <Skeleton className="h-6 w-24 mb-2" />
              {new Array(2).fill(0).map((_, index) => (
                <Skeleton key={index} className="h-9 w-full" />
              ))}
            </div>

            <div className="mb-10">
              <Skeleton className="h-6 w-24 mb-2" />
              {new Array(1).fill(0).map((_, index) => (
                <Skeleton key={index} className="h-9 w-full" />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}
