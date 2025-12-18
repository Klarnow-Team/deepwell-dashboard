"use client";

import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateForTable } from "@/lib/dashboard/formatDates";
import {
  formatCurrentApp,
  formatSendToCountry,
  formatFrequency,
  formatBiggestFrustration,
  formatInvestingStatus,
  formatResearchFollowUp,
} from "@/lib/dashboard/formatEnums";
import type { Waitlist } from "@prisma/client";

interface WaitlistTableProps {
  data: Waitlist[];
  isLoading?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSort?: (column: string) => void;
  onViewDetails?: (id: string) => void;
  currentPage?: number;
  pageSize?: number;
}

export function WaitlistTable({
  data,
  isLoading = false,
  sortBy,
  sortOrder,
  onSort,
  onViewDetails,
  currentPage = 1,
  pageSize = 25,
}: WaitlistTableProps) {
  const getSortIcon = (column: string) => {
    if (sortBy !== column) {
      return <ArrowUpDown className="h-4 w-4 ml-2 text-slate-400" />;
    }
    return sortOrder === "asc" ? (
      <ArrowUp className="h-4 w-4 ml-2" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-2" />
    );
  };

  const handleSort = (column: string) => {
    if (onSort) {
      onSort(column);
    }
  };

  const getTierVariant = (tier: number) => {
    if (tier === 1) return "tier1";
    if (tier === 2) return "tier2";
    return "tier3";
  };

  if (isLoading) {
    return (
      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Current App</TableHead>
              <TableHead>Send To Country</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Biggest Frustration</TableHead>
              <TableHead>Investing Status</TableHead>
              <TableHead>Research Follow-up</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-12" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-48" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>
                <button
                  className="flex items-center hover:text-slate-900"
                  onClick={() => handleSort("email")}
                  aria-label="Sort by email"
                >
                  Email
                  {getSortIcon("email")}
                </button>
              </TableHead>
              <TableHead>
                <button
                  className="flex items-center hover:text-slate-900"
                  onClick={() => handleSort("tier")}
                  aria-label="Sort by tier"
                >
                  Tier
                  {getSortIcon("tier")}
                </button>
              </TableHead>
              <TableHead>Current App</TableHead>
              <TableHead>Send To Country</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Biggest Frustration</TableHead>
              <TableHead>Investing Status</TableHead>
              <TableHead>Research Follow-up</TableHead>
              <TableHead>
                <button
                  className="flex items-center hover:text-slate-900"
                  onClick={() => handleSort("createdAt")}
                  aria-label="Sort by created date"
                >
                  Created At
                  {getSortIcon("createdAt")}
                </button>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-8 text-slate-500">
                  No entries found
                </TableCell>
              </TableRow>
            ) : (
              data.map((entry, index) => {
                const serialNumber = (currentPage - 1) * pageSize + index + 1;
                return (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{serialNumber}</TableCell>
                  <TableCell className="font-medium">{entry.email}</TableCell>
                  <TableCell>
                    <Badge variant={getTierVariant(entry.tier)}>
                      Tier {entry.tier}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {entry.currentApp
                      ? formatCurrentApp(entry.currentApp)
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {entry.sendToCountry
                      ? formatSendToCountry(entry.sendToCountry)
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {entry.frequency ? formatFrequency(entry.frequency) : "-"}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {entry.biggestFrustration
                      ? formatBiggestFrustration(entry.biggestFrustration)
                      : "-"}
                  </TableCell>
                  <TableCell className="max-w-[180px] truncate">
                    {entry.investingStatus
                      ? formatInvestingStatus(entry.investingStatus)
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {entry.researchFollowUp
                      ? formatResearchFollowUp(entry.researchFollowUp)
                      : "-"}
                  </TableCell>
                  <TableCell>{formatDateForTable(entry.createdAt)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails?.(entry.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              );
              })
            )}
          </TableBody>
        </Table>
    </div>
  );
}

