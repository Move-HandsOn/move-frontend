import style from './GroupCard.module.css';
import UsersThree from '../../assets/UsersThree.svg';
import Globe from '../../assets/Globe.svg';
import Lock from '../../assets/Lock.svg';

type Props = {
  id: number;
  image: string;
  name: string;
  members: number;
  privacy: string;
  onJoin: () => void;
  isJoined?: boolean;
};

function GroupCard({ image, name, members, privacy, onJoin, isJoined }: Props) {
  const handleJoinClick = () => {
    if (onJoin) {
      onJoin();
    }
  };

  return (
    <div className={style.groupCard}>
      <img src={image} alt={name} className={style.groupImage} />
      <div className={style.groupContent}>
        {' '}
        <p className={style.groupName}>{name}</p>
        <div className={style.groupDetails}>
          <img src={UsersThree} alt="" />

          <span className={style.groupDetails_members}>{members} membros</span>
        </div>
        <div>
          {privacy === 'Público' ? (
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
        className={`${style.joinButton} ${isJoined ? style.joinedButton : ''}`}
        onClick={handleJoinClick}
        disabled={isJoined}
      >
        {isJoined ? 'Participando' : 'Participar'}
      </button>
    </div>
  );
}

export default GroupCard;
