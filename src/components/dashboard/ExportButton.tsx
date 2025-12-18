"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ExportButtonProps {
  filters: Record<string, any>;
  format?: "csv" | "excel" | "json";
}

export function ExportButton({ filters, format = "csv" }: ExportButtonProps) {
  const handleExport = async () => {
    try {
      toast.loading("Exporting data...", { id: "export" });

      const response = await fetch("/api/dashboard/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          format,
          filters,
        }),
      });

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `waitlist-export-${new Date().toISOString().split("T")[0]}.${format === "excel" ? "xlsx" : format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Export completed successfully", { id: "export" });
    } catch (error) {
      toast.error("Failed to export data", { id: "export" });
      console.error("Export error:", error);
    }
  };

  return (
    <Button variant="secondary" onClick={handleExport}>
      <Download className="h-4 w-4 mr-2" />
      Export {format.toUpperCase()}
    </Button>
  );
}


