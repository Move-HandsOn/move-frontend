import Button from '@/components/Button/Button';
import GroupContentList from '@/components/GroupContentList/GroupContentList';
import GroupMenu from '@/components/GroupMenu/GroupMenu';
import FeedLayout from '@/FeedLayout';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGroupDetail } from '@/services/requests';
import style from './Group.module.css';
import { GroupTypes } from '@/types/groupTypes';

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
      return responseGroups;
    },
  });

  const [activities, setActivities] = useState<GroupTypes['activities']>([]);
const [events, setEvents] = useState<GroupTypes['events']>([]);
const [members, setMembers] = useState<GroupTypes['members']>([]);
const [groupRequests, setGroupRequests] = useState<GroupTypes['groupRequests']>([]); 

useEffect(() => {
  if (groupDetailData) {
    setActivities(groupDetailData.activities || []);
    setEvents(groupDetailData.events || []);
    setMembers(groupDetailData.members || []);
    setGroupRequests(groupDetailData.groupRequests || []);
  }
}, [groupDetailData]);


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
                src={groupDetailData?.group_image}
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
          <GroupContentList
            variant={statusGroup}
            activities={activities}
            events={events}
            members={members}
          />
        </section>
      </FeedLayout>
    </>
  );
};

export default Group;
