import style from './PublishOptionsList.module.css';
import CaretDownGreen from '../../assets/CaretDownGreen.svg';

type Props = {
  options: string[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

function PublishOptionsList({ options, value, onChange }: Props) {
  return (
    <div className={style.select_container}>
      <select className={style.custom_select} value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <img
        className={style.arrow_icon}
        src={CaretDownGreen}
        alt="Seta de abrir tipos de publicação"
      />
    </div>
  );
}

export default PublishOptionsList;
