import SearchNav from '@/components/SearchNav/SearchNav';
import NavSearchPage from '@/components/NavSearchPage/NavSearchPage';
import RectangleGroup from '@/components/RectangleGroup/RectangleGroup';
import { searchRequest } from '@/services/requests';
import { useState } from 'react';
import style from './SearchPage.module.css';
import Loading from '@/components/Loading/Loading';
import { DEBOUNCE_MS } from './types';
import { useDebounce } from '@uidotdev/usehooks';
import { useQuery} from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const [valueSearch, setValueSearch] = useState('');
  const [debouncedQuery] = useDebounce([valueSearch], DEBOUNCE_MS);

  const { isLoading, data } = useQuery({
    queryKey: ['search', ...debouncedQuery, searchParams.get('groups'), searchParams.get('users')],
    queryFn: async () => {
      const response = await searchRequest({
        value: valueSearch, 
        isGroups: searchParams.get('groups') === 'true' ? true : false,
        isUsers: searchParams.get('users') === 'true' ? true : false,
      })
      const users = response.users?.map(({ id, name, profile_image})=>({
        id, 
        name,
        type: 'users',
        image: profile_image
      }))
      const groups = response.groups?.map(({ id, name, group_image})=>({
        id, 
        name,
        type: 'groups',
        image: group_image
      }))
      const combinedData = [...(users || []), ...(groups || [])].sort((firstItem, secondItem) => {
        return firstItem.name.localeCompare(secondItem.name);
      });
      return combinedData
    },
  });

  const handleSearch = (term: string): void => {
    setValueSearch(term);
  };

  return (
    <>
      <SearchNav onSearch={handleSearch} />
      <NavSearchPage />
      <ul className={style.list_container}>
        {data?.map((groupOrUser) => {
            return groupOrUser.type === 'users' ? 
            (
              <RectangleGroup
                key={groupOrUser.id}
                id={groupOrUser.id}
                title={groupOrUser.name}
                img={groupOrUser.image}
                isUser={true}
                isSearch={true}
              />
            ) : 
            (
              <RectangleGroup
                key={groupOrUser.id}
                id={groupOrUser.id}
                title={groupOrUser.name}
                img={groupOrUser.image}
                status={'none'}
                isSearch={true}
              />
            )
        })}
      </ul>
      <Loading show={isLoading} />
    </>
  );
}

export default SearchPage;
