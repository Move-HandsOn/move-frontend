import ProfileCard from '@/components/ProfileCard/ProfileCard';
import { useState } from 'react';
import style from './Profile.module.css';
import Button from '@/components/Button/Button';
import BarChart from '../../components/BarChart/BarChart';
import CommentsModal from '../../components/CommentsModal/CommentsModal';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../services/requests';
import Activity from '@/components/Activity/Activity';
import { formatedActivityDate } from '../../utils/formatActivityDate';

function Profile() {
  const [showActivityChart, setShowActivityChart] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const { data: profileData } = useQuery({
    queryKey: ['profileData'],
    queryFn: async () => {
      const response = await getProfile();
      return response;
    },
  });

  const handleEvolutionClick = () => {
    setShowActivityChart(true);
  };

  const handleRecordsClick = () => {
    setShowActivityChart(false);
  };

  const handleOpenModalComments = () => {
    setOpenModal(true);
  };

  const handleCloseModalComments = () => {
    setOpenModal(false);
  };

  return (
    <div className={style.container}>
      <ProfileCard
        name={profileData?.name ?? ' '}
        profile_image={profileData?.profile_image ?? ' '}
        followerCount={profileData?.followerCount ?? 0}
        followingCount={profileData?.followingCount ?? 0}
        groupCount={profileData?.groupCount ?? 0}
        notification={profileData?.notification ?? undefined}
      />
      <div className={style.buttonBox}>
        <Button
          name="Minha Evolução"
          variant={showActivityChart ? 'standard' : 'gray'}
          style={{
            width: '163px',
            marginTop: 0,
            borderRadius: '0px',
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
            fontSize: '14px',
          }}
          onClick={handleEvolutionClick}
        />
        <Button
          name="Meus Registros"
          variant={showActivityChart ? 'gray' : 'standard'}
          style={{
            width: '163px',
            marginTop: 0,
            borderRadius: '0px',
            borderTopRightRadius: '8px',
            borderBottomRightRadius: '8px',
            fontSize: '14px',
          }}
          onClick={handleRecordsClick}
        />
      </div>
      {showActivityChart ? (
        <BarChart
          averageDaily={profileData?.averageDaily ?? 0}
          weekdayDuration={profileData?.weekdayDuration ?? []}
        />
      ) : (
        <div className={style.postsContainer}>
          {profileData?.activities?.map((activity) => (
            <Activity
              key={activity.id}
              author={{
                image: profileData.profile_image,
                name: profileData.name,
              }}
              content={activity.description}
              id={activity.id}
              likes={activity.likes.length}
              commentsCount={activity.comments.length}
              postDate={formatedActivityDate(activity.created_at)}
              onOpenComments={handleOpenModalComments}
              isUserView={activity.user_id === profileData.id}
              showOptions={true}
            />
          ))}
        </div>
      )}
      <CommentsModal open={openModal} onClose={handleCloseModalComments} />
    </div>
  );
}

export default Profile;
