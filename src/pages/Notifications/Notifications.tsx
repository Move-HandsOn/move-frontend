import styles from './Notifications.module.css';
import NavBar from '@/components/NavBar/NavBar';
import TabBar from '@/components/tabBar/tabBar';
import { categorizeNotifications } from '../../utils/categorizeNotification';
import { renderCategory } from '../../utils/renderCategory';
import { getNotifications } from '../../services/requests';
import { useQuery } from '@tanstack/react-query';
import { NotificationType } from '@/types/notificationTypes';
import Placeholder from '../../assets/placeholder.png';
import Loading from '@/components/Loading/Loading';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapApiToNotification(apiData: any[]): NotificationType[] {
  return apiData.map((item) => {
    const { follower, message } = item;

    const messageParts = message.split(' ');
    const nameInMessage = follower
      ? messageParts.slice(0, follower.name.split(' ').length).join(' ')
      : '';

    const cleanMessage =
      follower && nameInMessage === follower.name
        ? messageParts.slice(follower.name.split(' ').length).join(' ')
        : message;

    return {
      id: item.id,
      user: {
        name: follower?.name || '',
        image: follower?.profile_image || Placeholder,
      },
      message: cleanMessage,
      date: item.createdAt,
    };
  });
}

function Notification() {
  const [loading, setLoading] = useState(false);
  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      try {
        setLoading(true);

        const response = await getNotifications();
        return mapApiToNotification(response);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw error.response.data;
      } finally {
        setLoading(false);
      }
    },
  });

  const { today, yesterday, thisWeek, last30Days } = categorizeNotifications(
    notifications ?? []
  );

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <NavBar title="Notificações" />
      </div>
      <div>
        {notifications && (
          <>
            {renderCategory('Hoje', today)}
            {renderCategory('Ontem', yesterday)}
            {renderCategory('Esta semana', thisWeek)}
            {renderCategory('Últimos 30 dias', last30Days)}
          </>
        )}
      </div>
      <TabBar />
      <Loading show={loading} />
    </div>
  );
}

export default Notification;
