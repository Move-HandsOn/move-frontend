import style from '../Groups/Groups.module.css';
import Button from '@/components/Button/Button';
import SearchBar from '@/components/SearchBar/SearchBar';
import ListMyGroups from '@/components/ListMyGroups/ListMyGroups';
import { useState } from 'react';
import FeedLayout from '@/FeedLayout';

const Groups = () => {
  const [statusGroup, setStatusGroup] = useState('myGroups');

  const setMyGroups = () => {
    if (!statusGroup) {
      setStatusGroup('myGroups');
    }
  };

  const setOtherGroups = () => {
    if (statusGroup) {
      setStatusGroup('otherGroups');
    }
  };

  return (
    <>
      <FeedLayout title="Grupos">
        <section className={style.feed_container}>
          <div className={style.button_container}>
            <Button name="Meus Grupos" variant="standard" />
            <Button name="Outros Grupos" variant="gray" />
          </div>
          <div className={style.nav_container}>
            <SearchBar />
          </div>
          <ListMyGroups variant={statusGroup} />
          {/* {
                        statusGroup ? <ListMyGroups variant={statusGroup} /> : <ListOtherGroups />
                    } */}
        </section>
      </FeedLayout>
    </>
  );
};

export default Groups;
