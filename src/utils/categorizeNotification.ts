import { NotificationType } from '@/types/notificationTypes';
import { toZonedTime } from 'date-fns-tz';
import { differenceInDays } from 'date-fns';

interface CategorizedNotifications {
  today: NotificationType[];
  yesterday: NotificationType[];
  thisWeek: NotificationType[];
  last30Days: NotificationType[];
}

export function categorizeNotifications(
  notifications: NotificationType[]
): CategorizedNotifications {
  const today: NotificationType[] = [];
  const yesterday: NotificationType[] = [];
  const thisWeek: NotificationType[] = [];
  const last30Days: NotificationType[] = [];

  const now = new Date();
  const timeZone = 'America/Sao_Paulo';
  const nowLocal = toZonedTime(now, timeZone);

  notifications.forEach((notification) => {
    const notificationDate = new Date(notification.date);
    const notificationDateLocal = toZonedTime(notificationDate, timeZone);
    const diffInDays = differenceInDays(nowLocal, notificationDateLocal);

    if (diffInDays === 0) {
      today.push(notification);
    } else if (diffInDays === 1) {
      yesterday.push(notification);
    } else if (diffInDays >= 2 && diffInDays <= 7) {
      thisWeek.push(notification);
    } else if (diffInDays <= 30) {
      last30Days.push(notification);
    }
  });

  return { today, yesterday, thisWeek, last30Days };
}
