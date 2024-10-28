import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SearchTypes } from '../types/searchTypes';

function useSearch() {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<SearchTypes[]> => {
      const result = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      return result.data;
    },
  });

  return (
    <div>
      {query.isLoading && 'Carregando...'}

      {query.data && (
        <ul>
          {query.data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default useSearch;
