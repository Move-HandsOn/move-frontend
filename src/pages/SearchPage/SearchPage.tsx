import SearchNav from '@/components/SearchNav/SearchNav';
import NavSearchPage from '@/components/NavSearchPage/NavSearchPage';
import RectangleGroup from '@/components/RectangleGroup/RectangleGroup';
import { searchUsersAndGroups } from '@/services/requests';
import { useEffect, useState } from 'react';
import style from './SearchPage.module.css';

interface GroupsProps {
  created_at?: Date;
  description?: string;
  group_image?: string;
  id: string;
  name: string;
  members?: unknown[];
  group_type?: string;
  isParticipation?: boolean;
  variant?: string;
}

interface UsersProps {
  email?: string;
  profile_image?: string;
  bio?: string;
  name?: string;
  id: string;
  gender?: string | null;
}

interface UsersAndGroupsProps extends GroupsProps {
  email?: string;
  profile_image?: string;
  bio?: string;
  gender?: string | null;
}


function SearchPage() {

  const [statusList, setStatusList] = useState<string>('all')
  const [users, setUsers ] = useState<UsersProps[]>([])
  const [groups, setGroups] = useState<GroupsProps[]>([])
  const [allList, setAllList] = useState<UsersAndGroupsProps[]>([])
  const [valueSearch, setValueSearch] = useState('')

  console.log(valueSearch)
  const setStatusAll = () =>{
    if(statusList !== 'all'){
      setStatusList('all')
    }
  }

  const setStatusGroups = () =>{
    if(statusList !== 'groups'){
      setStatusList('groups')
    }
  }

  const setStatusUsers = () =>{
    if(statusList !== 'users'){
      setStatusList('users')
    }
  }


  useEffect(() => {
    const fetchlist = async () => {
      if (valueSearch.length > 2) {
        const listDataUser = await searchUsersAndGroups({
          value: valueSearch,
          filter: 'users',
        });
        setGroups(listDataUser.groups);
        const listDataGroups = await searchUsersAndGroups({
          value: valueSearch,
          filter: 'groups',
        });
        setUsers(listDataGroups.users);
  
        const listUserGroup: UsersAndGroupsProps[] = groups.concat(
          users as UsersAndGroupsProps[]
        );
        setAllList(listUserGroup);
      } else {
        const listData = await searchUsersAndGroups({});
        setGroups(listData.groups);
        setUsers(listData.users);
  
        const listUserGroup: UsersAndGroupsProps[] = listData.groups.concat(
          listData.users as UsersAndGroupsProps[]
        );
        setAllList(listUserGroup);
      }
    };
  
    fetchlist();
  }, [valueSearch]);
  


  const handleSearch = (term: string): void => {
      setValueSearch(term)
  };

  return (
    <>
      <SearchNav onSearch={handleSearch} />
      <NavSearchPage 
        setStatusAll={setStatusAll}
        setStatusGroup={setStatusGroups}
        setStatusUsers={setStatusUsers}
      />
      <ul className={style.list_container}>
        {
          statusList === 'all' ?
          allList.map((obj) => {
            return (
              <RectangleGroup
                key={obj.id}
                id={obj.id}
                title={obj.name}
                img={obj.group_image ? obj.group_image : obj.profile_image}
                isUser={obj.profile_image ? true : false}
                isSearch={true}
              />
            );
          })
          : statusList === 'groups' ?
          groups.map((obj) => {
            return (
              <RectangleGroup
                key={obj.id}
                id={obj.id}
                title={obj.name}
                img={obj.group_image}
                isSearch={true}
              />
            );
          })
          :
          users.map((obj) => {
            return (
              <RectangleGroup
                key={obj.id}
                id={obj.id}
                title={obj.name}
                img={obj.profile_image}
                isUser={obj.profile_image ? true : false}
                isSearch={true}
              />
            );
          })
        }
      </ul>
    </>
  );}

export default SearchPage;
