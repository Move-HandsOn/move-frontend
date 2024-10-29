import Bell from '../../assets/Bell.svg';
import styles from './ProfileCard.module.css';
import { ProfileTypes } from '../../types/profileTypes';

const ProfileCard: React.FC<ProfileTypes> = ({
  name,
  image,
  followers,
  following,
  groups,
  notification,
}) => {
  return (
    <div className={styles.profileCardContainer}>
      <div className={styles.profileInfo}>
        <img alt={name} src={image} />
        <h5 className={styles.userName}>{name}</h5>
        <div className={styles.profileStats}>
          <span>
            {followers} <p>seguidores</p>
          </span>
          <span>
            {following} <p>seguindo</p>
          </span>

          <span>
            {groups} <p>grupos</p>
          </span>
        </div>
      </div>
      <div className={styles.notificationIcon}>
        <img src={Bell} alt="Alerta de Notificação" />
        <div className={styles.notificationBox}>
          <p>{notification}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
