import style from '../Groups/Groups.module.css';
import Button from '@/components/Button/Button';
import SearchBar from '@/components/SearchBar/SearchBar';
import ListMyGroups from '@/components/ListMyGroups/ListMyGroups';
import { useState } from 'react';
import FeedLayout from '@/FeedLayout';

const Groups = () => {
  const [statusGroup, setStatusGroup] = useState('otherGroups');

  const setMyGroups = () => {
    if (statusGroup === 'otherGroups') {
      setStatusGroup('myGroups');
    }
  };

  const setOtherGroups = () => {
    if (statusGroup === 'myGroups') {
      setStatusGroup('otherGroups');
    }
  };

  return (
    <>
      <FeedLayout title="Grupos">
        <section className={style.feed_container}>
          <div className={style.button_container}>
            <Button
              name="Meus Grupos"
              variant={statusGroup === 'myGroups' ? 'standard' : 'gray'}
              onClick={setMyGroups}
            />
            <Button
              name="Outros Grupos"
              variant={statusGroup === 'otherGroups' ? 'standard' : 'gray'}
              onClick={setOtherGroups}
            />
          </div>
          <div className={style.nav_container}>
            <SearchBar />
          </div>
          <ListMyGroups variant={statusGroup} />
        </section>
      </FeedLayout>
    </>
  );
};

export default Groups;
