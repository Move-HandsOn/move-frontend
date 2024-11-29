import style from './GroupCard.module.css';
import UsersThree from '../../assets/UsersThree.svg';
import Globe from '../../assets/Globe.svg';
import Lock from '../../assets/Lock.svg';
import Check from '../../assets/Check.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { requestJoinGroup } from '@/services/requests';

interface GroupCardProps {
  created_at: Date;
  description: string;
  group_image: string;
  id: string;
  name: string;
  members?: unknown[];
  group_type?: string;
  onJoin?: () => void;
  status: string;
}

function GroupCard({
  id,
  group_image,
  name,
  members,
  group_type,
  status: initialStatus,
}: GroupCardProps) {
  const [status, setStatus] = useState(initialStatus);
  const navigate = useNavigate();

  async function handleJoinGroup() {
    try {
      if (status !== 'none') {
        setStatus('none');
        await requestJoinGroup(id);
        return;
      }

      const response = await requestJoinGroup(id);
      const message = response?.data?.message;

      setStatus(
        message === 'Joined.'
          ? 'joined'
          : message === 'Join request sent.'
            ? 'pending'
            : status
      );
    } catch (error) {
      console.error('Failed to join group:', error);
    }
  }

  return (
    <div className={style.groupCard}>
      <div onClick={() => navigate(`/group-detail/${id}`)}>
        <img src={group_image} alt={name} className={style.groupImage} />
        <div className={style.groupContent}>
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
      </div>
      <button
        className={`${style.joinButton} ${status === 'joined' || status === 'pending' ? style.joinedButton : ''
          }`}
        onClick={(e) => {
          e.stopPropagation();
          handleJoinGroup();
        }}
      >
        {status === 'joined' || status === 'pending' ? (
          <div className={style.joinButton_joined}>
            <img src={Check} alt="" />
            <p>{status === 'joined' ? 'Participando' : 'Solicitado'}</p>
          </div>
        ) : (
          'Participar'
        )}
      </button>
    </div>
  );
}

export default GroupCard;
