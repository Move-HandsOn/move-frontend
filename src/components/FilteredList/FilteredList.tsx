function FilteredList({ results }) {
  return (
    <div className="filtered-list">
      {results.map((item, index) => (
        <div key={index} className="filtered-item">
          <div className="filtered-item-title">
            <strong>{item.name || item.title}</strong>
          </div>
          <img src={item.img || item.image} alt={item.name || item.title} />
          <p>Type: {item.type || 'Unknown'}</p>
        </div>
      ))}
    </div>
  );
}

export default FilteredList;
