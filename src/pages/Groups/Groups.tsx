import style from '../Groups/Groups.module.css';
import Button from '@/components/Button/Button';
import SearchBar from '@/components/SearchBar/SearchBar';
import ListMyGroups from '@/components/ListMyGroups/ListMyGroups';
import { useState } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import TabBar from '@/components/tabBar/tabBar';

const Groups = () => {
  const [statusGroup, setStatusGroup] = useState('myGroups');
  const [filterGroupValue, setFilterGroupValue] = useState('');

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
      <div className={style.navBar}>
        <NavBar title="Grupos" />
      </div>
      <section className={style.feed_container}>
        <div className={style.button_container}>
          <Button
            name="Meus grupos"
            variant={statusGroup === 'myGroups' ? 'standard' : 'gray'}
            onClick={setMyGroups}
          />
          <Button
            name="Outros grupos"
            variant={statusGroup === 'otherGroups' ? 'standard' : 'gray'}
            onClick={setOtherGroups}
          />
        </div>
        <div className={style.nav_container}>
          <SearchBar onSearch={(value) => setFilterGroupValue(value)} />
        </div>
        <ListMyGroups
          variant={statusGroup}
          filteredItemValue={filterGroupValue}
        />
      </section>
      <TabBar />
    </>
  );
};

export default Groups;
