import styles from './Notifications.module.css';
import NavBar from '@/components/NavBar/NavBar';
import TabBar from '@/components/tabBar/tabBar';
import { categorizeNotifications } from '../../utils/categorizeNotification';
import { renderCategory } from '../../utils/renderCategory';
import { getNotifications } from '../../services/requests';
import { useQuery } from '@tanstack/react-query';
import { NotificationType } from '@/types/notificationTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapApiToNotification(apiData: any[]): NotificationType[] {
  return apiData.map((item) => {
    const { follower, message } = item;
    const messageParts = message.split(' ');
    const nameInMessage = messageParts
      .slice(0, follower.name.split(' ').length)
      .join(' ');

    const cleanMessage =
      nameInMessage === follower.name
        ? messageParts.slice(follower.name.split(' ').length).join(' ')
        : message;

    return {
      id: item.id,
      user: {
        name: follower?.name,
        image: follower?.profile_image,
      },
      message: cleanMessage,
      date: item.createdAt,
    };
  });
}

function Notification() {
  const {
    data: notifications,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await getNotifications();
      return mapApiToNotification(response);
    },
  });

  if (isLoading) {
    return (
      <p className={styles.noNotificationsMessage}>
        Carregando notificações...
      </p>
    );
  }

  if (isError || !notifications) {
    return (
      <p className={styles.noNotificationsMessage}>
        Erro ao carregar notificações. Tente novamente mais tarde.
      </p>
    );
  }

  const { today, yesterday, thisWeek, last30Days } =
    categorizeNotifications(notifications);

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
