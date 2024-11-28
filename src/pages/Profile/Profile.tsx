import Activity from '@/components/Activity/Activity';
import Button from '@/components/Button/Button';
import Loading from '@/components/Loading/Loading';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import { ProfileTypes } from '@/types/profileTypes';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import BarChart from '../../components/BarChart/BarChart';
import { deleteActivity, getProfile } from '../../services/requests';
import { formatedActivityDate } from '../../utils/formatActivityDate';
import { formatDuration } from '../../utils/formatDuration';
import style from './Profile.module.css';

const categoryMap: Record<number, string> = {
  1: 'Corrida',
  2: 'Caminhada',
  3: 'Ciclismo',
  4: 'Trilha',
  5: 'Futebol',
  6: 'Basquete',
  7: 'Vôlei',
  8: 'Tênis',
  9: 'Natação',
  10: 'Musculação',
  11: 'Crossfit',
};

function Profile() {
  const [showActivityChart, setShowActivityChart] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: profileData } = useQuery({
    queryKey: ['profileData'],
    queryFn: async () => {
      try {
        setLoading(true);
        const response = await getProfile();
        return response;
      } catch (error) {
        const axiosError = error as AxiosError;

        throw axiosError.response?.data;
      } finally {
        setLoading(false);
      }
    },
  });

  const [activities, setActivities] = useState<ProfileTypes['activities']>(
    profileData?.activities || []
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

  const handleDeleteActivity = async (id: string) => {
    setLoading(true);
    setActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== id)
    );

    await deleteActivity(id);
    setOpenModal(false);
    setLoading(false);
  };

  useEffect(() => {
    if (profileData?.activities) {
      setActivities(profileData.activities);
    }
  }, [profileData]);

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
          {activities.map((activity) => (
            <Activity
              key={activity.id}
              author={{
                image: profileData?.profile_image,
                name: profileData?.name,
              }}
              content={activity.description}
              id={activity?.id ?? ' '}
              likes={activity.likes.length}
              commentsCount={activity.comments.length}
              postDate={formatedActivityDate(activity.created_at)}
              onOpenComments={handleOpenModalComments}
              isUserView={activity.user_id === profileData?.id}
              showOptions={true}
              activityImage={activity.media}
              categoryName={categoryMap[activity.category_id]}
              duration={formatDuration(activity.duration)}
              onDeletePost={handleDeleteActivity}
              openModal={openModal}
              handleCloseModalComments={handleCloseModalComments}
              listComments={activity.comments}
            />
          ))}
        </div>
      )}
      <Loading show={loading} />
    </div>
  );
}

export default Profile;
