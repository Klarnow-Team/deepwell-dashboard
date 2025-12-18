"use client";

import { useState, useEffect, useCallback } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { FiltersBar } from "@/components/dashboard/FiltersBar";
import { WaitlistTable } from "@/components/dashboard/WaitlistTable";
import { UserDetailModal } from "@/components/dashboard/UserDetailModal";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Pagination } from "@/components/ui/pagination";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { toast } from "sonner";
import type { Waitlist } from "@prisma/client";

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function SignupsPage() {
  const [data, setData] = useState<Waitlist[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 25,
    total: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<Waitlist | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [tier, setTier] = useState("all");
  const [currentApp, setCurrentApp] = useState("all");
  const [sendToCountry, setSendToCountry] = useState("all");
  const [frequency, setFrequency] = useState("");
  const [researchFollowUp, setResearchFollowUp] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Sorting
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        sortBy,
        sortOrder,
        ...(search && { search }),
        ...(tier && tier !== "all" && { tier }),
        ...(currentApp && currentApp !== "all" && { currentApp }),
        ...(sendToCountry && sendToCountry !== "all" && { sendToCountry }),
        ...(researchFollowUp && researchFollowUp !== "all" && { researchFollowUp }),
        ...(dateFrom && { dateFrom }),
        ...(dateTo && { dateTo }),
      });

      const response = await fetch(`/api/dashboard/waitlist?${params}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result.data);
      setPagination(result.pagination);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load waitlist data");
    } finally {
      setIsLoading(false);
    }
  }, [
    pagination.page,
    pagination.limit,
    sortBy,
    sortOrder,
    search,
    tier,
    currentApp,
    sendToCountry,
    researchFollowUp,
    dateFrom,
    dateTo,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handlePageSizeChange = (limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }));
  };

  const handleViewDetails = async (id: string) => {
    setSelectedUserId(id);
    try {
      const response = await fetch(`/api/dashboard/waitlist/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const user = await response.json();
      setSelectedUser(user);
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to load user details");
    }
  };

  const handleClearFilters = () => {
    setSearch("");
    setTier("all");
    setCurrentApp("all");
    setSendToCountry("all");
    setFrequency("");
    setResearchFollowUp("all");
    setDateFrom("");
    setDateTo("");
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleRefresh = () => {
    fetchData();
    toast.success("Data refreshed");
  };

  const showingStart = data.length > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0;
  const showingEnd = Math.min(pagination.page * pagination.limit, pagination.total);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader onRefresh={handleRefresh} isLoading={isLoading} title="Signups" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-slate-900">Signups</h1>
                  <p className="text-slate-600 mt-2">
                    View and manage all waitlist signups
                  </p>
                </div>

                <FiltersBar
                  search={search}
                  onSearchChange={setSearch}
                  tier={tier}
                  onTierChange={setTier}
                  currentApp={currentApp}
                  onCurrentAppChange={setCurrentApp}
                  sendToCountry={sendToCountry}
                  onSendToCountryChange={setSendToCountry}
                  frequency={frequency}
                  onFrequencyChange={setFrequency}
                  researchFollowUp={researchFollowUp}
                  onResearchFollowUpChange={setResearchFollowUp}
                  dateFrom={dateFrom}
                  onDateFromChange={setDateFrom}
                  dateTo={dateTo}
                  onDateToChange={setDateTo}
                  onClearFilters={handleClearFilters}
                />
              </div>
              <div className="px-4 lg:px-6">
                {pagination.total === 0 && !isLoading ? (
                  <EmptyState
                    type={search || (tier && tier !== "all") || (currentApp && currentApp !== "all") || (sendToCountry && sendToCountry !== "all") || (researchFollowUp && researchFollowUp !== "all") || dateFrom || dateTo ? "no-results" : "no-data"}
                    onClearFilters={handleClearFilters}
                  />
                ) : (
                  <>
                    <WaitlistTable
                      data={data}
                      isLoading={isLoading}
                      sortBy={sortBy}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                      onViewDetails={handleViewDetails}
                      currentPage={pagination.page}
                      pageSize={pagination.limit}
                    />
                    {pagination.totalPages > 0 && (
                      <div className="mt-4">
                        <Pagination
                          currentPage={pagination.page}
                          totalPages={pagination.totalPages}
                          onPageChange={handlePageChange}
                          pageSize={pagination.limit}
                          onPageSizeChange={handlePageSizeChange}
                          total={pagination.total}
                          showingStart={showingStart}
                          showingEnd={showingEnd}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>

      {/* User Detail Modal */}
      <UserDetailModal
        user={selectedUser}
        open={!!selectedUserId}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedUserId(null);
            setSelectedUser(null);
          }
        }}
      />
    </SidebarProvider>
  );
}
