import PlaceHolder from '@/assets/placeholder.png';
import Activity from '@/components/Activity/Activity';
import GroupCard from '@/components/GroupCard/GroupCard';
import Loading from '@/components/Loading/Loading';
import {
  allGroupsRequest,
  feedRequest,
  getProfile,
  requestJoinGroup,
} from '@/services/requests';
import { formatedActivityDate } from '@/utils/formatActivityDate';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { formatDuration } from '../../utils/formatDuration';
import style from '../Feed/Feed.module.css';
import { categoryMap } from './types';
import { AxiosError } from 'axios';

function Feed() {
  const [openModal, setOpenModal] = useState(false);
  const [, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const { data: AllGroups, refetch: refetchAllGroups } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const responseGroups = await allGroupsRequest();
      return responseGroups;
    },
  });

  const { data: feed } = useQuery({
    queryKey: ['feed'],
    queryFn: async () => {
      try {
        setLoading(true);
        const responseActivities = await feedRequest();
        return responseActivities;
      } catch (error) {
        const axiosError = error as AxiosError;

        throw axiosError.response?.data;
      } finally {
        setLoading(false);
      }
    },
  });

  const { data: profileData } = useQuery({
    queryKey: ['profileData'],
    queryFn: async () => {
      const response = await getProfile();
      return response;
    },
  });

  const selectActivityId = (activityId: string) => {
    setSearchParams((params) => {
      params.set('activityId', activityId);
      return params;
    });
  };

  const handleJoinGroup = async (groupId: string) => {
    await requestJoinGroup(groupId);

    refetchAllGroups();
  };

  return (
    <div className={style.feed_container}>
      <h1 className={style.header_title}>Olá, {profileData?.name ?? ''}! </h1>
      <h3 className={style.group_section}>Grupos de atividades</h3>

      <div className={style.groupsContainer}>
        {AllGroups?.map((group) => (
          <div className={style.cardWrapper} key={group.id}>
            <GroupCard
              created_at={group.created_at ?? new Date()}
              id={group.id}
              description={group.description ?? ''}
              group_image={group.group_image ?? PlaceHolder}
              status={group.status}
              name={group.name}
              members={group.members}
              group_type={group.group_type}
              key={group.id}
              onJoin={() => handleJoinGroup(group.id)}
            />
          </div>
        ))}
      </div>

      <div className={style.all_posts}>
        {feed?.activities &&
          feed?.activities?.map((activityData) => (
            <div key={activityData.id}>
              <Activity
                content={activityData.description ?? ''}
                id={activityData.id}
                likes={Number(activityData.likes.length)}
                author={{
                  name: activityData.user.name,
                  image: activityData.user.profile_image,
                }}
                categoryName={categoryMap[activityData.category_id]}
                key={activityData.id}
                commentsCount={activityData.comments.length}
                postDate={formatedActivityDate(activityData.created_at)}
                onOpenComments={() => {
                  setOpenModal(true);
                  selectActivityId(activityData.id);
                }}
                isUserView={activityData.user.id === profileData?.id}
                activityImages={activityData.media.map(
                  (item) => item.media_url
                )}
                duration={formatDuration(activityData.duration)}
                openModal={openModal}
                handleCloseModalComments={() => {
                  setOpenModal(false);
                  selectActivityId('');
                }}
                comments={activityData.comments}
                isCurrentLike={activityData.currentUserliked}
              />
            </div>
          ))}
      </div>
      <div className={style.tabBox}></div>
      <Loading show={loading} />
    </div>
  );
}

export default Feed;
