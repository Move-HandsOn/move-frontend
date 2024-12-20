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
import { AxiosError } from 'axios';
import { useState } from 'react';
import { formatDuration } from '../../utils/formatDuration';
import style from '../Feed/Feed.module.css';
import { categoryMap } from './types';

function Feed() {
  const [loading, setLoading] = useState(false);

  const { data: AllGroups, refetch: refetchAllGroups } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      return await allGroupsRequest();
    },
  });

  const { data: feed } = useQuery({
    queryKey: ['feed'],
    queryFn: async () => {
      try {
        setLoading(true);
        return await feedRequest();
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
      return await getProfile();
    },
  });

  const handleJoinGroup = async (groupId: string) => {
    await requestJoinGroup(groupId);

    refetchAllGroups();
  };

  if (loading) {
    return <Loading show={loading} />;
  }

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
                description={activityData.description ?? ''}
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
                isUserView={true}
                activityImages={activityData.media.map(
                  (media) => media.media_url
                )}
                duration={formatDuration(activityData.duration)}
                comments={activityData.comments}
                isCurrentLike={activityData.currentUserliked}
              />
            </div>
          ))}
      </div>
      <div className={style.tabBox}></div>
    </div>
  );
}

export default Feed;
