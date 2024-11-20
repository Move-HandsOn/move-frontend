import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
} from 'date-fns';

export function formatTimeAgo(date: Date): string {
  const now = new Date();

  const minutes = differenceInMinutes(now, date);
  if (minutes < 60) {
    return `${minutes}min`;
  }

  const hours = differenceInHours(now, date);
  if (hours < 24) {
    return `${Math.floor(hours)}h`;
  }

  const days = differenceInDays(now, date);
  if (days === 1) {
    return '1d';
  }
  if (days < 7) {
    return `${days}d`;
  }

  const weeks = differenceInWeeks(now, date);
  return `${weeks}sem`;
}
