import { Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onExport?: () => void;
  onRefresh?: () => void;
  isLoading?: boolean;
}

export function DashboardHeader({
  onExport,
  onRefresh,
  isLoading = false,
}: DashboardHeaderProps) {
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Waitlist Dashboard
          </h1>
          <p className="text-base text-slate-600 mt-1">
            View and manage all waitlist signups
          </p>
        </div>
        <div className="flex items-center gap-3">
          {onRefresh && (
            <Button
              variant="secondary"
              onClick={onRefresh}
              disabled={isLoading}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          )}
          {onExport && (
            <Button variant="secondary" onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}


