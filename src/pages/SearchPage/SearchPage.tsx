import SearchNav from '@/components/SearchNav/SearchNav';
import ImageList from '../../components/ImageList/ImageList';
import { useState, useEffect } from 'react';
import SearchResults from '../../mocks/searchResults.json';
import FilteredList from '@/components/FilteredList/FilteredList';
import style from './SearchPage.module.css';

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

  return (
    <>
      <SearchNav onSearch={handleSearch} />

      {isSearching && (
        <div className={style.filtersCombo}>
          <button
            className={`${style.filter} ${activeFilter === 'all' ? style.activeFilter : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            Tudo
          </button>
          <button
            className={`${style.filter} ${activeFilter === 'user' ? style.activeFilter : ''}`}
            onClick={() => handleFilterChange('user')}
          >
            Pessoas
          </button>
          <button
            className={`${style.filter} ${activeFilter === 'group' ? style.activeFilter : ''}`}
            onClick={() => handleFilterChange('group')}
          >
            Grupos
          </button>
          <button
            className={`${style.filter} ${activeFilter === 'post' ? style.activeFilter : ''}`}
            onClick={() => handleFilterChange('post')}
          >
            Publicações
          </button>
        </div>
      )}

      {searchResults.length === 0 ? (
        <p className={style.noMatches}>Nenhum resultado encontrado</p>
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
