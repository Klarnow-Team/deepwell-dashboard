import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader isLoading={true} />
      <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto space-y-6">
          <StatsCards
            total={0}
            tier1={0}
            tier2={0}
            tier3={0}
            recent24h={0}
            isLoading={true}
          />
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="p-4 space-y-4">
              <Skeleton className="h-12 w-full" />
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


