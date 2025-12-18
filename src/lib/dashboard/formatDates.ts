import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";

export function formatDateForTable(date: Date | null | undefined): string {
  if (!date) return "";
  return format(new Date(date), "MMM dd, yyyy");
}

export function formatDateForDetail(date: Date | null | undefined): string {
  if (!date) return "";
  return format(new Date(date), "MMMM dd, yyyy 'at' HH:mm");
}

export function formatDateRelative(date: Date | null | undefined): string {
  if (!date) return "";
  const dateObj = new Date(date);
  
  if (isToday(dateObj)) {
    return formatDistanceToNow(dateObj, { addSuffix: true });
  }
  
  if (isYesterday(dateObj)) {
    return "Yesterday";
  }
  
  // If less than 7 days ago, show relative time
  const daysDiff = Math.floor(
    (Date.now() - dateObj.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (daysDiff < 7) {
    return formatDistanceToNow(dateObj, { addSuffix: true });
  }
  
  return formatDateForTable(date);
}


