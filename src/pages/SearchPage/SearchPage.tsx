import SearchNav from '@/components/SearchNav/SearchNav';
import NavSearchPage from '@/components/NavSearchPage/NavSearchPage';
import RectangleGroup from '@/components/RectangleGroup/RectangleGroup';
import { searchUsersAndGroups } from '@/services/requests';
import { useState } from 'react';
import style from './SearchPage.module.css';
import { ProfileTypes } from '@/types/profileTypes';
import Loading from '@/components/Loading/Loading';
import { DEBOUNCE_MS } from './types';
import { useDebounce } from '@uidotdev/usehooks';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [statusList, setStatusList] = useState<string>('all');
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [groups, setGroups] = useState<GroupsProps[]>([]);
  const [allList, setAllList] = useState<UsersAndGroupsProps[]>([]);
  const [valueSearch, setValueSearch] = useState('');
  const [debouncedQuery] = useDebounce(valueSearch, DEBOUNCE_MS);

  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData<ProfileTypes>(['profileData']);

  const changeUsers = () => {
    const users = searchParams.get('users')
    setSearchParams(params => {
      params.set('users', (users === 'true' ? 'false' : 'true'));
      return params
    })
  };

  const changeGroups = () => {
    const groups = searchParams.get('groups')
    setSearchParams(params => {
      params.set('groups', (groups === 'true' ? 'false' : 'true'));
      return params
    })
  };

  const changeAll = () => {
    const groups = searchParams.get('groups')
    const users = searchParams.get('users')
    setSearchParams(params => {
      if(groups === 'true' && users === 'true') {
        params.set('users', 'false');
        params.set('groups', 'false');
        return params
      }

      if(groups === 'false' && users === 'false') {
        params.set('users', 'true');
        params.set('groups', 'true');
        return params
      }

      if((groups === 'false' && users === 'true') || (groups === 'true' && users === 'false')) {
        params.set('users', 'true');
        params.set('groups', 'true');
        return params
      }
      return params
    })
  };


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

  const { isLoading } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: async () => {
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
    },
  });

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
      <Loading show={isLoading} />
    </>
  );
}

export default SearchPage;
