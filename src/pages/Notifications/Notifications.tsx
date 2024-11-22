import styles from './Notifications.module.css';
import NavBar from '@/components/NavBar/NavBar';
import TabBar from '@/components/tabBar/tabBar';
import notificationData from '../../mocks/notificationData.json';
import { categorizeNotifications } from '../../utils/categorizeNotification';
import { renderCategory } from '../../utils/renderCategory';

function Notification() {
  const { today, yesterday, thisWeek, last30Days } =
    categorizeNotifications(notificationData);

  const allEmpty =
    !today.length &&
    !yesterday.length &&
    !thisWeek.length &&
    !last30Days.length;

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <NavBar title="Notificações" />
      </div>
      <div>
        {allEmpty ? (
          <p className={styles.noNotificationsMessage}>Nenhuma notificação.</p>
        ) : (
          <>
            {renderCategory('Hoje', today)}
            {renderCategory('Ontem', yesterday)}
            {renderCategory('Esta semana', thisWeek)}
            {renderCategory('Últimos 30 dias', last30Days)}
          </>
        )}
      </div>
      <TabBar />
    </div>
  );
}

export default Notification;
