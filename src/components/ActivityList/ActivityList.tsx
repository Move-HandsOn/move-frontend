import style from './ActivityList.module.css';
import CaretDownGray from '../../assets/CaretDownGray.svg';

type Props = {
  options: string[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

function ActivityList({ options, value, onChange }: Props) {
  return (
    <div className={style.select_container}>
      <select className={style.custom_select} value={value} onChange={onChange}>
        <option value="" disabled hidden>
          Qual atividade você praticou?
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <img
        className={style.arrow_icon}
        src={CaretDownGray}
        alt="Seta de abrir listagem de atividades"
      />
    </div>
  );
}

export default ActivityList;
