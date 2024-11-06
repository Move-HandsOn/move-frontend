import Button from '@/components/Button/Button';
import GroupContentList from '@/components/GroupContentList/GroupContentList';
import GroupMenu from '@/components/GroupMenu/GroupMenu';
import FeedLayout from '@/FeedLayout';
import { useState } from 'react';
import groupData from '../../mocks/groupData.json';
import style from './Group.module.css';

const Group = () => {
  const findGroup = groupData[0];

  const [adm] = useState(false);
  const [statusGroup, setStatusGroup] = useState<"posts" | "requests" | "events">("posts");

  const setPosts = () => {
    if(statusGroup !== "posts"){
      setStatusGroup("posts")
    }
  }

  const setRequests = () => {
    if(statusGroup !== "requests"){
      setStatusGroup("requests")
    }
  }

  const setEvents = () => {
    if(statusGroup !== "events"){
      setStatusGroup("events")
    }
  }

  return (
    <>
      <FeedLayout title={findGroup.name}>
        <section className={style.group_header_container}>
          <div className={style.group_header_info_container}>
            <div className={style.group_header_info_img_btn_container}>
              <img src={findGroup.image} alt={findGroup.name} />
              <Button name={findGroup.name} variant="gray" />
            </div>
            <div className={style.group_header_info_bio_container}>
              <p>
                Objeto de GROUP precisa de uma BIO, Objeto de GROUP precisa de
                uma BIO, Objeto de GROUP precisa de uma BIO
              </p>
            </div>
          </div>
          <GroupMenu 
            isAdm={adm}
            setPosts={setPosts}
            setRequests={setRequests}
            setEvents={setEvents}
            statusGroup={statusGroup}
          />
          <GroupContentList variant={statusGroup} />
        </section>
      </FeedLayout>
    </>
  );
};

export default Group;
