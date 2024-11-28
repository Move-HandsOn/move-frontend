import style from '../Feed/Feed.module.css';
import GroupCard from '@/components/GroupCard/GroupCard';
import { useState } from 'react';
import {
  feedRequest,
  allGroupsRequest,
  getProfile,
  requestJoinGroup,
} from '@/services/requests';
import { useQuery } from '@tanstack/react-query';
import PlaceHolder from '@/assets/placeholder.png';
import Activity from '@/components/Activity/Activity';
import { formatedActivityDate } from '@/utils/formatActivityDate';
import { formatDuration } from '../../utils/formatDuration';
import { useSearchParams } from 'react-router-dom';
import { categoryMap } from './types';

function Feed() {
  const [openModal, setOpenModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();

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
      const responseActivities = await feedRequest();
      return responseActivities;
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

      <div className={style.all_posts} >
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
                activityImages={activityData.media.map((item) => item.media_url)}
                duration={formatDuration(activityData.duration)}
                openModal={openModal}
                handleCloseModalComments={() => {
                  setOpenModal(false);
                  selectActivityId('');
                }}
                comments={activityData.comments}
                onDeletePost={() => { }}
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
