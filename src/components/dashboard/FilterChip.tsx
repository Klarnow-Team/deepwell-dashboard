import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FilterChipProps {
  label: string;
  value: string;
  onRemove: () => void;
  className?: string;
}

export function FilterChip({ label, value, onRemove, className }: FilterChipProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 hover:bg-slate-100",
        className
      )}
    >
      <span className="text-xs font-medium">
        {label}: <span className="font-semibold">{value}</span>
      </span>
      <button
        onClick={onRemove}
        className="ml-1 rounded-full hover:bg-slate-200 p-0.5 transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X className="h-3 w-3" />
      </button>
    </Badge>
  );
}


