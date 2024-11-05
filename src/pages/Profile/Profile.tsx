import ProfileCard from '@/components/ProfileCard/ProfileCard';
import ProfileData from '../../mocks/profileData.json';
import { useState } from 'react';
import style from './Profile.module.css';
import Button from '@/components/Button/Button';
import BarChart from '../../components/BarChart/BarChart';
import CommentsModal from '../../components/CommentsModal/CommentsModal';
import Posts from '@/components/Posts/Posts';
import PostsData from '../../mocks/postsData.json';

function Profile() {
  const [profileData] = useState(ProfileData);
  const [showActivityChart, setShowActivityChart] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [userPosts, setUserPosts] = useState(
    PostsData.filter((post) => post.isUserView)
  );

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

  const handleDeletePost = (id: number) => {
    const updatedPosts = userPosts.filter((post) => post.id !== id);
    setUserPosts(updatedPosts);
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
        <div className={style.postsContainer}>
          {userPosts.map((post) => (
            <Posts
              key={post.id}
              {...post}
              onOpenComments={handleOpenModalComments}
              isUserView={post.isUserView}
              onDeletePost={handleDeletePost}
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
