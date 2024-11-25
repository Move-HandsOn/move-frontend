import style from './GroupCard.module.css';
import UsersThree from '../../assets/UsersThree.svg';
import Globe from '../../assets/Globe.svg';
import Lock from '../../assets/Lock.svg';
import Check from '../../assets/Check.svg';

interface GroupCardProps {
  created_at: Date;
  description: string;
  group_image: string;
  id: string;
  name: string;
  members?: unknown[];
  group_type?: string;
  isParticipation: boolean;
  onJoin?: () => void;
}

function GroupCard({
  group_image,
  name,
  members,
  group_type,
  onJoin,
  isParticipation,
}: GroupCardProps) {
  const handleJoinClick = () => {
    if (onJoin) {
      onJoin();
    }
  };

  return (
    <div className={style.groupCard}>
      <img src={group_image} alt={name} className={style.groupImage} />
      <div className={style.groupContent}>
        {' '}
        <p className={style.groupName}>{name}</p>
        <div className={style.groupDetails}>
          <img src={UsersThree} alt="" />

          <span className={style.groupDetails_members}>
            {members ? members.length : 0} membros
          </span>
        </div>
        <div>
          {group_type === 'public' ? (
            <div className={style.groupPrivacy}>
              <p className={style.groupPrivacy_status}>Público</p>
              <img className={style.groupPrivacy_icon} src={Globe} />
            </div>
          ) : (
            <div className={style.groupPrivacy}>
              <p className={style.groupPrivacy_status}>Privado</p>

              <img className={style.groupPrivacy_icon} src={Lock} />
            </div>
          )}
        </div>
      </div>
      <button
        className={`${style.joinButton} ${isParticipation ? style.joinedButton : ''}`}
        onClick={handleJoinClick}
        disabled={isParticipation}
      >
        {isParticipation ? (
          <div className={style.joinButton_joined}>
            <img src={Check} alt="" />
            <p>Participando</p>
          </div>
        ) : (
          'Participar'
        )}
      </button>
    </div>
  );
}

export default GroupCard;
