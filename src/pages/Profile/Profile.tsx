import ProfileCard from '@/components/ProfileCard/ProfileCard';
import ProfileData from '../../mocks/profileData.json';
import { useState } from 'react';
import style from './Profile.module.css';
import Button from '@/components/Button/Button';
import BarChart from '../../components/BarChart/BarChart';
import InteractionBox from '@/components/InteractionBox/InteractionBox';
import CommentsModal from '../../components/CommentsModal/CommentsModal';

function Profile() {
  const [profileData] = useState(ProfileData);
  const [showActivityChart, setShowActivityChart] = useState(true);
  const [openModal, setOpenModal] = useState(false);

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
        name={profileData.name}
        image={profileData.image}
        followers={profileData.followers}
        following={profileData.following}
        groups={profileData.groups}
        notification={profileData.notification}
        dailyAverage={''}
        activityRecords={[]}
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
          dailyAverage={ProfileData.dailyAverage}
          activityRecords={ProfileData.activityRecords}
        />
      ) : (
        <>
          <InteractionBox
            id={0}
            author={{
              name: '',
              image: '',
            }}
            content={''}
            postDate={''}
            commentsCount={3}
            likes={0}
            likedByCurrentUser={false}
            onOpenComments={handleOpenModalComments}
          />
        </>
      )}
      <CommentsModal open={openModal} onClose={handleCloseModalComments} />
    </div>
  );
}

export default Profile;
