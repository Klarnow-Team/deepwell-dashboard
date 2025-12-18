"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterChip } from "./FilterChip";
import {
  CurrentApp,
  SendToCountry,
  ResearchFollowUp,
} from "@prisma/client";

interface FiltersBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  tier: string;
  onTierChange: (value: string) => void;
  currentApp: string;
  onCurrentAppChange: (value: string) => void;
  sendToCountry: string;
  onSendToCountryChange: (value: string) => void;
  frequency: string;
  onFrequencyChange: (value: string) => void;
  researchFollowUp: string;
  onResearchFollowUpChange: (value: string) => void;
  dateFrom: string;
  onDateFromChange: (value: string) => void;
  dateTo: string;
  onDateToChange: (value: string) => void;
  onClearFilters: () => void;
}

export function FiltersBar({
  search,
  onSearchChange,
  tier,
  onTierChange,
  currentApp,
  onCurrentAppChange,
  sendToCountry,
  onSendToCountryChange,
  frequency,
  onFrequencyChange,
  researchFollowUp,
  onResearchFollowUpChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  onClearFilters,
}: FiltersBarProps) {
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  const activeFilters = [
    tier && tier !== "all" && { key: "tier", label: "Tier", value: tier },
    currentApp && currentApp !== "all" && { key: "currentApp", label: "Current App", value: currentApp },
    sendToCountry && sendToCountry !== "all" && {
      key: "sendToCountry",
      label: "Send To Country",
      value: sendToCountry,
    },
    frequency && { key: "frequency", label: "Frequency", value: frequency },
    researchFollowUp && researchFollowUp !== "all" && {
      key: "researchFollowUp",
      label: "Research Follow-up",
      value: researchFollowUp,
    },
    dateFrom && { key: "dateFrom", label: "Date From", value: dateFrom },
    dateTo && { key: "dateTo", label: "Date To", value: dateTo },
  ].filter(Boolean) as Array<{ key: string; label: string; value: string }>;

  const hasActiveFilters = activeFilters.length > 0 || localSearch;

  const handleClearFilter = (filterKey: string) => {
    switch (filterKey) {
      case "tier":
        onTierChange("all");
        break;
      case "currentApp":
        onCurrentAppChange("all");
        break;
      case "sendToCountry":
        onSendToCountryChange("all");
        break;
      case "frequency":
        onFrequencyChange("");
        break;
      case "researchFollowUp":
        onResearchFollowUpChange("all");
        break;
      case "dateFrom":
        onDateFromChange("");
        break;
      case "dateTo":
        onDateToChange("");
        break;
    }
  };

  const handleClearSearch = () => {
    setLocalSearch("");
    onSearchChange("");
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search by email..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-10 pr-10"
          />
          {localSearch && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Select value={tier} onValueChange={onTierChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tiers</SelectItem>
            <SelectItem value="1">Tier 1</SelectItem>
            <SelectItem value="2">Tier 2</SelectItem>
            <SelectItem value="3">Tier 3</SelectItem>
          </SelectContent>
        </Select>

        <Select value={currentApp} onValueChange={onCurrentAppChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Current App" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Apps</SelectItem>
            <SelectItem value={CurrentApp.Wise}>Wise</SelectItem>
            <SelectItem value={CurrentApp.LemFi}>LemFi</SelectItem>
            <SelectItem value={CurrentApp.WorldRemit}>WorldRemit</SelectItem>
            <SelectItem value={CurrentApp.Remitly}>Remitly</SelectItem>
            <SelectItem value={CurrentApp.WesternUnionMoneyGram}>
              Western Union / MoneyGram
            </SelectItem>
            <SelectItem value={CurrentApp.BankTransfer}>Bank Transfer</SelectItem>
            <SelectItem value={CurrentApp.Other}>Other</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sendToCountry} onValueChange={onSendToCountryChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Send To Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            <SelectItem value={SendToCountry.Nigeria}>Nigeria</SelectItem>
            <SelectItem value={SendToCountry.Ghana}>Ghana</SelectItem>
            <SelectItem value={SendToCountry.Kenya}>Kenya</SelectItem>
            <SelectItem value={SendToCountry.Jamaica}>Jamaica</SelectItem>
            <SelectItem value={SendToCountry.Other}>Other</SelectItem>
          </SelectContent>
        </Select>

        <Select value={researchFollowUp} onValueChange={onResearchFollowUpChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Research Follow-up" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value={ResearchFollowUp.YesHappyToHelp}>
              Yes, happy to help
            </SelectItem>
            <SelectItem value={ResearchFollowUp.MaybeSendMoreDetails}>
              Maybe, send more details
            </SelectItem>
            <SelectItem value={ResearchFollowUp.NoNotRightNow}>
              No, not right now
            </SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="date"
          placeholder="Date From"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          className="w-[140px]"
        />

        <Input
          type="date"
          placeholder="Date To"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
          className="w-[140px]"
        />

        {hasActiveFilters && (
          <Button variant="ghost" onClick={onClearFilters} size="sm">
            Clear All
          </Button>
        )}
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <FilterChip
              key={filter.key}
              label={filter.label}
              value={filter.value}
              onRemove={() => handleClearFilter(filter.key)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

