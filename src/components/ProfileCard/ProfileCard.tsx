import Bell from '../../assets/Bell.svg';
import styles from './ProfileCard.module.css';
import { ProfileTypes } from '../../types/profileTypes';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '../../services/requests';

const ProfileCard: React.FC<
  Pick<
    ProfileTypes,
    | 'name'
    | 'profile_image'
    | 'followerCount'
    | 'followingCount'
    | 'groupCount'
    | 'notification'
  >
> = ({ name, profile_image, followerCount, followingCount, groupCount }) => {
  const navigate = useNavigate();

  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await getNotifications();
      return response;
    },
  });

  return (
    <div className={styles.profileCardContainer}>
      <div className={styles.profileInfo}>
        <img alt={name} src={profile_image} />
        <h5 className={styles.userName}>{name}</h5>
        <div className={styles.profileStats}>
          <span>
            {followerCount} <p>seguidores</p>
          </span>
          <span>
            {followingCount} <p>seguindo</p>
          </span>

          <span>
            {groupCount} <p>grupos</p>
          </span>
        </div>
      </div>
      <div
        className={styles.notificationIcon}
        onClick={() => navigate('/profile/notifications')}
      >
        <img src={Bell} alt="Alerta de Notificação" />
        {notifications && (
          <div className={styles.notificationBox}>
            <p>{notifications.length}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
