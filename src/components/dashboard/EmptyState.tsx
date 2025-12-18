import { Inbox, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  type: "no-data" | "no-results";
  onClearFilters?: () => void;
}

export function EmptyState({ type, onClearFilters }: EmptyStateProps) {
  if (type === "no-data") {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <Users className="h-12 w-12 text-slate-400 mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          No signups yet
        </h3>
        <p className="text-sm text-slate-600 max-w-md">
          Waitlist entries will appear here once users sign up
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <Search className="h-12 w-12 text-slate-400 mb-4" />
      <h3 className="text-lg font-semibold text-slate-900 mb-2">
        No waitlist entries found
      </h3>
      <p className="text-sm text-slate-600 max-w-md mb-4">
        Try adjusting your filters or search terms
      </p>
      {onClearFilters && (
        <Button variant="secondary" onClick={onClearFilters}>
          Clear Filters
        </Button>
      )}
    </div>
  );
}


