import { NotificationType } from '../types/notificationTypes';
import { formatTimeAgo } from './formatTimeAgo';
import styles from '../pages/Notifications/Notifications.module.css';
import Placeholder from '../assets/placeholder.png';

export function renderCategory(
  title: string,
  notifications: NotificationType[]
) {
  if (notifications.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {notifications.map(function (notification) {
        const timeAgo = formatTimeAgo(new Date(notification.date));
        return (
          <div key={notification.id} className={styles.notificationItem}>
            <img
              src={notification.user.image || Placeholder}
              alt={notification.user.name}
              className={styles.userAvatar}
            />
            <div className={styles.notificationContent}>
              <p className={styles.notificationAuthor}>
                {notification.user.name}
              </p>
              <p className={styles.notificationText}>
                {notification.message}
                <span className={styles.timeAgo}>{timeAgo}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
