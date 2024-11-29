import PlacerHolder from '@/assets/placeholder.png';
import Button from '@/components/Button/Button';
import GroupContentList from '@/components/GroupContentList/GroupContentList';
import GroupMenu from '@/components/GroupMenu/GroupMenu';
import FeedLayout from '@/FeedLayout';
import { getGroupDetail } from '@/services/requests';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './Group.module.css';
const Group = () => {
  const params = useParams() as { id: string };

  const [adm] = useState(false);
  const [statusGroup, setStatusGroup] = useState<
    'posts' | 'requests' | 'events'
  >('posts');

  const { data: groupDetailData } = useQuery({
    queryKey: ['groups-detail'],
    queryFn: async () => {
      const responseGroups = await getGroupDetail(params.id ?? '');
      return responseGroups[0];
    },
  });

  const setPosts = () => {
    if (statusGroup !== 'posts') {
      setStatusGroup('posts');
    }
  };

  const setRequests = () => {
    if (statusGroup !== 'requests') {
      setStatusGroup('requests');
    }
  };

  const setEventsView = () => {
    if (statusGroup !== 'events') {
      setStatusGroup('events');
    }
  };

  return (
    <>
      <FeedLayout title={groupDetailData?.name}>
        <section className={style.group_header_container}>
          <div className={style.group_header_info_container}>
            <div className={style.group_header_info_img_btn_container}>
              <img
                src={groupDetailData?.group_image ?? PlacerHolder}
                alt={groupDetailData?.name}
              />
              <Button name={groupDetailData?.name} variant="gray" />
            </div>
            <div className={style.group_header_info_bio_container}>
              <p>{groupDetailData?.description}</p>
            </div>
          </div>
          <GroupMenu
            isAdm={adm}
            setPosts={setPosts}
            setRequests={setRequests}
            setEvents={setEventsView}
            statusGroup={statusGroup}
          />
          <GroupContentList variant={statusGroup} group={groupDetailData} />
        </section>
      </FeedLayout>
    </>
  );
};

export default Group;
