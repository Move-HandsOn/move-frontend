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
import { AxiosError } from 'axios';

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

    
    const newItem = {
      id: item.id,
      user: {
        name: follower?.name || '',
        image: follower?.profile_image || Placeholder,
      },
      message: cleanMessage,
      date: item.createdAt,
    };
      
    if(item.event_type === 'like_on_comment'){
      newItem.user.name = item.like.user.name;
      newItem.user.image = item.like.user.profile_image;
      newItem.message = item.message.replace(item.like.user.name, '');
    }

    if(item.event_type === 'like_on_activity'){
      newItem.user.name = item.like.user.name;
      newItem.user.image = item.like.user.profile_image;
      newItem.message = item.message.replace(item.like.user.name, '');
    }


    if(item.event_type === 'comment_on_activity'){
      newItem.user.name = item.comment.user.name;
      newItem.user.image = item.comment.user.profile_image;
      newItem.message = item.message.replace(item.comment.user.name, '');
    }

    return newItem;
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
      } catch (error) {
        const axiosError = error as AxiosError;

        throw axiosError.response?.data;
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
