import SearchBar from '../../components/SearchBar/SearchBar';
import NavBar from '@/components/NavBar/NavBar';
import style from './SearchNav.module.css';

function SearchNav({ onSearch }) {
  return (
    <div className={style.container}>
      <NavBar title="" />
      <SearchBar onSearch={onSearch} />
    </div>
  );
}

export default SearchNav;
