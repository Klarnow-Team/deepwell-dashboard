"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { formatDateForDetail } from "@/lib/dashboard/formatDates";
import {
  formatCurrentApp,
  formatSendToCountry,
  formatFrequency,
  formatBiggestFrustration,
  formatInvestingStatus,
  formatDesiredFeature,
  formatResearchFollowUp,
  formatPreferredContactMethod,
} from "@/lib/dashboard/formatEnums";
import type { Waitlist } from "@prisma/client";

interface UserDetailModalProps {
  user: Waitlist | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserDetailModal({
  user,
  open,
  onOpenChange,
}: UserDetailModalProps) {
  if (!user) return null;

  const getTierVariant = (tier: number) => {
    if (tier === 1) return "tier1";
    if (tier === 2) return "tier2";
    return "tier3";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Complete information for {user.email}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-3 border-b border-slate-200 pb-4">
            <h3 className="text-lg font-semibold text-slate-900">Basic Info</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Email</label>
                <p className="text-sm text-slate-900 mt-1">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Tier</label>
                <div className="mt-1">
                  <Badge variant={getTierVariant(user.tier)}>
                    Tier {user.tier}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Created At
                </label>
                <p className="text-sm text-slate-900 mt-1">
                  {formatDateForDetail(user.createdAt)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Updated At
                </label>
                <p className="text-sm text-slate-900 mt-1">
                  {formatDateForDetail(user.updatedAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Survey Responses */}
          <div className="space-y-4 border-b border-slate-200 pb-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Survey Responses
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Q1: Current App
                </label>
                <p className="text-sm text-slate-900 mt-1">
                  {user.currentApp
                    ? formatCurrentApp(user.currentApp)
                    : "Not provided"}
                </p>
                {user.currentApp === "Other" && user.currentAppOther && (
                  <p className="text-sm text-slate-600 mt-1 italic">
                    Other: {user.currentAppOther}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Q2: Send To Country
                </label>
                <p className="text-sm text-slate-900 mt-1">
                  {user.sendToCountry
                    ? formatSendToCountry(user.sendToCountry)
                    : "Not provided"}
                </p>
                {user.sendToCountry === "Other" && user.sendToCountryOther && (
                  <p className="text-sm text-slate-600 mt-1 italic">
                    Other: {user.sendToCountryOther}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Q3: Frequency
                </label>
                <p className="text-sm text-slate-900 mt-1">
                  {user.frequency ? formatFrequency(user.frequency) : "Not provided"}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Q4: Biggest Frustration
                </label>
                <p className="text-sm text-slate-900 mt-1">
                  {user.biggestFrustration
                    ? formatBiggestFrustration(user.biggestFrustration)
                    : "Not provided"}
                </p>
                {user.biggestFrustration === "Other" &&
                  user.biggestFrustrationOther && (
                    <p className="text-sm text-slate-600 mt-1 italic">
                      Other: {user.biggestFrustrationOther}
                    </p>
                  )}
                {user.oneThingToChange && (
                  <div className="mt-2">
                    <label className="text-sm font-medium text-slate-700">
                      One Thing To Change
                    </label>
                    <p className="text-sm text-slate-900 mt-1">
                      {user.oneThingToChange}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Q5: Investing Status
                </label>
                <p className="text-sm text-slate-900 mt-1">
                  {user.investingStatus
                    ? formatInvestingStatus(user.investingStatus)
                    : "Not provided"}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Q6: Desired Feature
                </label>
                <p className="text-sm text-slate-900 mt-1">
                  {user.desiredFeature
                    ? formatDesiredFeature(user.desiredFeature)
                    : "Not provided"}
                </p>
                {user.desiredFeature === "Other" && user.desiredFeatureOther && (
                  <p className="text-sm text-slate-600 mt-1 italic">
                    Other: {user.desiredFeatureOther}
                  </p>
                )}
                {user.perfectAppDesign && (
                  <div className="mt-2">
                    <label className="text-sm font-medium text-slate-700">
                      Perfect App Design
                    </label>
                    <p className="text-sm text-slate-900 mt-1">
                      {user.perfectAppDesign}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Q7: Research Follow-up
                </label>
                <p className="text-sm text-slate-900 mt-1">
                  {user.researchFollowUp
                    ? formatResearchFollowUp(user.researchFollowUp)
                    : "Not provided"}
                </p>
                {user.preferredContactMethod && (
                  <div className="mt-2">
                    <label className="text-sm font-medium text-slate-700">
                      Preferred Contact Method
                    </label>
                    <p className="text-sm text-slate-900 mt-1">
                      {formatPreferredContactMethod(user.preferredContactMethod)}
                    </p>
                  </div>
                )}
                {user.whatsappNumber && (
                  <div className="mt-2">
                    <label className="text-sm font-medium text-slate-700">
                      WhatsApp Number
                    </label>
                    <p className="text-sm text-slate-900 mt-1">
                      {user.whatsappNumber}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Metadata</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Invite Count
                </label>
                <p className="text-sm text-slate-900 mt-1">{user.inviteCount}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Email Sent
                </label>
                <p className="text-sm text-slate-900 mt-1">
                  {user.emailSent ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">User ID</label>
                <p className="text-sm text-slate-500 mt-1 font-mono text-xs">
                  {user.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


