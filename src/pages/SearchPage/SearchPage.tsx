import SearchNav from '@/components/SearchNav/SearchNav';
import ImageList from '../../components/ImageList/ImageList';
import { useState, useEffect } from 'react';
import SearchResults from '../../mocks/searchResults.json';
import FilteredList from '@/components/FilteredList/FilteredList';

function SearchPage() {
  const [searchResults, setSearchResults] = useState(SearchResults);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    applyFilterAndSearch(searchTerm, filter);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setIsSearching(!!term);
    applyFilterAndSearch(term, activeFilter);
  };

  const applyFilterAndSearch = (term: string, filter: string) => {
    let filteredResults = SearchResults.filter(
      (item) =>
        item.title?.toLowerCase().includes(term.toLowerCase()) ||
        item.name?.toLowerCase().includes(term.toLowerCase())
    );

    if (filter !== 'all') {
      filteredResults = filteredResults.filter((item) => item.type === filter);
    }

    setSearchResults(filteredResults);
  };

  const mainImageResults = searchResults.filter(
    (item) => item.img && item.title
  );

  useEffect(() => {
    applyFilterAndSearch(searchTerm, activeFilter);
  }, [searchTerm, activeFilter]);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults(SearchResults);
    }
  }, [searchTerm]);

  return (
    <>
      <SearchNav onSearch={handleSearch} />

      {isSearching && (
        <div>
          <button onClick={() => handleFilterChange('all')}>Tudo</button>
          <button onClick={() => handleFilterChange('user')}>Pessoas</button>
          <button onClick={() => handleFilterChange('group')}>Grupos</button>
          <button onClick={() => handleFilterChange('post')}>
            Publicações
          </button>
        </div>
      )}

      {searchResults.length === 0 ? (
        <p>Nenhum resultado encontrado</p>
      ) : (
        <>
          {isSearching ? (
            <FilteredList results={searchResults} />
          ) : (
            <ImageList
              image={mainImageResults}
              type={'group'}
              id={0}
              name={[]}
            />
          )}
        </>
      )}
    </>
  );
}

export default SearchPage;
