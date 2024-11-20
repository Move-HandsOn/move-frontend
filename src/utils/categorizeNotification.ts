import { isToday, isYesterday, isThisWeek, differenceInDays } from 'date-fns';
import { NotificationType } from '@/types/notificationTypes';

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

  notifications.forEach((notification) => {
    const notificationDate = new Date(notification.date);

    if (isToday(notificationDate)) {
      today.push(notification);
    } else if (isYesterday(notificationDate)) {
      yesterday.push(notification);
    } else if (isThisWeek(notificationDate)) {
      thisWeek.push(notification);
    } else if (differenceInDays(now, notificationDate) <= 30) {
      last30Days.push(notification);
    }
  });

  return { today, yesterday, thisWeek, last30Days };
}
