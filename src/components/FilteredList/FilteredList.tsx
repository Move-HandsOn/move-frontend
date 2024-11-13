import Placeholder from '../../assets/placeholder.png';
import style from './FilteredList.module.css';

function FilteredList({ results }) {
  return (
    <div className={style.filteredList}>
      {results.map((item, index) => (
        <div key={index} className={style.filteredItem}>
          <p>{item.name || item.title}</p>
          <img
            src={item.img || item.image || Placeholder}
            alt={item.name || item.title}
          />
        </div>
      ))}
    </div>
  );
}

export default FilteredList;
