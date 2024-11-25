import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
} from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export function formatTimeAgo(date: Date): string {
  const timeZone = 'America/Sao_Paulo';
  const localDate = toZonedTime(date, timeZone);

  const now = toZonedTime(new Date(), timeZone);

  const minutes = differenceInMinutes(now, localDate);
  if (minutes < 60) {
    return `${minutes}min`;
  }

  const hours = differenceInHours(now, localDate);
  if (hours < 24) {
    return `${Math.floor(hours)}h`;
  }

  const days = differenceInDays(now, localDate);
  if (days === 1) {
    return '1d';
  }
  if (days < 7) {
    return `${days}d`;
  }

  const weeks = differenceInWeeks(now, localDate);
  return `${weeks}sem`;
}
