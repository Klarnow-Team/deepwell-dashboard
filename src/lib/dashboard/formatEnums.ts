import {
  CurrentApp,
  SendToCountry,
  Frequency,
  BiggestFrustration,
  InvestingStatus,
  DesiredFeature,
  ResearchFollowUp,
  PreferredContactMethod,
} from "@prisma/client";

export function formatEnum(value: string | null | undefined): string {
  if (!value) return "";
  return value
    .replace(/([A-Z])/g, " $1")
    .trim()
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());
}

export function formatCurrentApp(value: CurrentApp | null | undefined): string {
  if (!value) return "";
  const mapping: Record<CurrentApp, string> = {
    Wise: "Wise",
    LemFi: "LemFi",
    WorldRemit: "WorldRemit",
    Remitly: "Remitly",
    WesternUnionMoneyGram: "Western Union / MoneyGram",
    BankTransfer: "Bank Transfer",
    Other: "Other",
  };
  return mapping[value] || formatEnum(value);
}

export function formatSendToCountry(
  value: SendToCountry | null | undefined
): string {
  if (!value) return "";
  return value; // Countries are already properly formatted
}

export function formatFrequency(
  value: Frequency | null | undefined
): string {
  if (!value) return "";
  const mapping: Record<Frequency, string> = {
    EveryWeek: "Every week",
    Every2Weeks: "Every 2 weeks",
    EveryMonth: "Every month",
    FewTimesAYear: "Few times a year",
    ItDepends: "It depends",
  };
  return mapping[value] || formatEnum(value);
}

export function formatBiggestFrustration(
  value: BiggestFrustration | null | undefined
): string {
  if (!value) return "";
  const mapping: Record<BiggestFrustration, string> = {
    HighFees: "High fees",
    BadExchangeRates: "Bad exchange rates",
    SlowTransfersDelays: "Slow transfers/delays",
    TooManyAppsAndSteps: "Too many apps and steps",
    LackOfTrustHiddenCharges: "Lack of trust / Hidden charges",
    Other: "Other",
  };
  return mapping[value] || formatEnum(value);
}

export function formatInvestingStatus(
  value: InvestingStatus | null | undefined
): string {
  if (!value) return "";
  const mapping: Record<InvestingStatus, string> = {
    AlreadyInvestingRegularly: "Already investing regularly",
    StartedLittleNotConsistent: "Started a little, not consistent",
    WantToStartDontKnowWhere: "Want to start, don't know where",
    NotInterestedRightNow: "Not interested right now",
  };
  return mapping[value] || formatEnum(value);
}

export function formatDesiredFeature(
  value: DesiredFeature | null | undefined
): string {
  if (!value) return "";
  const mapping: Record<DesiredFeature, string> = {
    VeryLowOrZeroFees: "Very low or zero fees",
    SendAndInvestInOneTap: "Send and invest in one tap",
    AIGuidanceOnInvesting: "AI guidance on investing",
    ClearTrackingOfSendAndInvest: "Clear tracking of send and invest",
    LearningContentAboutMoney: "Learning content about money",
    Other: "Other",
  };
  return mapping[value] || formatEnum(value);
}

export function formatResearchFollowUp(
  value: ResearchFollowUp | null | undefined
): string {
  if (!value) return "";
  const mapping: Record<ResearchFollowUp, string> = {
    YesHappyToHelp: "Yes, happy to help",
    MaybeSendMoreDetails: "Maybe, send more details",
    NoNotRightNow: "No, not right now",
  };
  return mapping[value] || formatEnum(value);
}

export function formatPreferredContactMethod(
  value: PreferredContactMethod | null | undefined
): string {
  if (!value) return "";
  return value === "Email" ? "Email" : "WhatsApp";
}


