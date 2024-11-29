import SearchNav from '@/components/SearchNav/SearchNav';
import NavSearchPage from '@/components/NavSearchPage/NavSearchPage';
import RectangleGroup from '@/components/RectangleGroup/RectangleGroup';
import { searchUsersAndGroups } from '@/services/requests';
import { useEffect, useState } from 'react';
import style from './SearchPage.module.css';
import { useQueryClient } from '@tanstack/react-query';
import { ProfileTypes } from '@/types/profileTypes';

interface GroupsProps {
  created_at?: Date;
  description?: string;
  group_image?: string;
  id: string;
  name?: string;
  members?: unknown[];
  group_type?: string;
  status?: string;
  variant?: string;
}

interface UsersProps {
  profile_image?: string;
  name?: string;
  id: string;
}

interface UsersAndGroupsProps extends GroupsProps {
  email?: string;
  profile_image?: string;
  bio?: string;
  gender?: string | null;
}

function SearchPage() {
  const [statusList, setStatusList] = useState<string>('all');
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [groups, setGroups] = useState<GroupsProps[]>([]);
  const [allList, setAllList] = useState<UsersAndGroupsProps[]>([]);
  const [valueSearch, setValueSearch] = useState('');

  const queryClient = useQueryClient()
  const profile = queryClient.getQueryData<ProfileTypes>(['profileData'])

  const setStatusAll = () => {
    if (statusList !== 'all') {
      setStatusList('all');
    }
  };

  const setStatusGroups = () => {
    if (statusList !== 'groups') {
      setStatusList('groups');
    }
  };

  const setStatusUsers = () => {
    if (statusList !== 'users') {
      setStatusList('users');
    }
  };

  useEffect(() => {
    const fetchlist = async () => {
      if (valueSearch.length > 2) {
        const listDataUser = await searchUsersAndGroups({
          value: valueSearch,
          filter: 'users',
        });
        const listDataGroups = await searchUsersAndGroups({
          value: valueSearch,
          filter: 'groups',
        });

        const updatedGroups = listDataGroups.groups || [];
        const updatedUsers = listDataUser.users || [];

        setGroups(updatedGroups);
        setUsers(updatedUsers);

        const listUserGroup: UsersAndGroupsProps[] = [
          ...updatedGroups,
          ...updatedUsers,
        ];
        setAllList(listUserGroup);
      } else {
        const listData = await searchUsersAndGroups({});
        const updatedGroups = listData.groups || [];
        const updatedUsers = listData.users || [];

        setGroups(updatedGroups);
        setUsers(updatedUsers);

        const listUserGroup: UsersAndGroupsProps[] = [
          ...updatedGroups,
          ...updatedUsers,
        ];
        setAllList(listUserGroup);
      }
    };

    fetchlist();
  }, [valueSearch, profile]);

  const handleSearch = (term: string): void => {
    setValueSearch(term);
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
        {statusList === 'all'
          ? allList.map((obj) => {
            return (
              <RectangleGroup
                key={obj.id}
                id={obj.id}
                title={obj.name}
                status={obj.status}
                img={obj.group_image ? obj.group_image : obj.profile_image}
                isUser={obj.profile_image ? true : false}
                isSearch={true}
              />
            );
          })
          : statusList === 'groups'
            ? groups.map((obj) => {
              return (
                <RectangleGroup
                  key={obj.id}
                  id={obj.id}
                  title={obj.name}
                  img={obj.group_image}
                  status={obj.status}
                  isSearch={true}
                />
              );
            })
            : users.map((obj) => {
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
            })}
      </ul>
    </>
  );
}

export default SearchPage;
