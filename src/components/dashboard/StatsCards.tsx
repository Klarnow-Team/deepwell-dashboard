import { Users, UserCheck, TrendingUp } from "lucide-react";

interface StatsCardsProps {
  total: number;
  tier1: number;
  tier2: number;
  tier3: number;
  recent24h: number;
  isLoading?: boolean;
}

interface StatCardProps {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  isLoading?: boolean;
}

function StatCard({ icon, value, label, isLoading }: StatCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-slate-200 animate-pulse" />
          <div className="flex-1">
            <div className="h-8 w-20 bg-slate-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-[#00674F]/10 text-[#00674F]">
          {icon}
        </div>
        <div>
          <div className="text-3xl font-bold text-[#00674F] mb-1">
            {typeof value === "number" ? value.toLocaleString() : value}
          </div>
          <div className="text-sm text-slate-600">{label}</div>
        </div>
      </div>
    </div>
  );
}

export function StatsCards({
  total,
  tier1,
  tier2,
  tier3,
  recent24h,
  isLoading = false,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      <StatCard
        icon={<Users className="h-6 w-6" />}
        value={total}
        label="Total Signups"
        isLoading={isLoading}
      />
      <StatCard
        icon={<UserCheck className="h-6 w-6" />}
        value={tier1}
        label="First 250"
        isLoading={isLoading}
      />
      <StatCard
        icon={<UserCheck className="h-6 w-6" />}
        value={tier2}
        label="Next 500"
        isLoading={isLoading}
      />
      <StatCard
        icon={<UserCheck className="h-6 w-6" />}
        value={tier3}
        label="Everyone Else"
        isLoading={isLoading}
      />
      <StatCard
        icon={<TrendingUp className="h-6 w-6" />}
        value={recent24h}
        label="Recent Signups"
        isLoading={isLoading}
      />
    </div>
  );
}

