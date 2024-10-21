import style from './HourInput.module.css';
import CaretDownGray from '../../assets/CaretDownGray.svg';
import Clock from '../../assets/Clock.svg';

type Props = {
  dates: string[];
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onClick?: () => void;
};

function HourInput({ hours, value, onChange, onClick }: Props) {
  return (
    <div className={style.select_container} onClick={onClick}>
      <select className={style.custom_select} value={value} onChange={onChange}>
        <option value="" disabled selected>
          Duração
        </option>
        {
          value && <option value={value}>{value}</option>
        }

        {/* {dates.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))} */}
      </select>
      <div className={style.icon_container}>
        <img
          className={style.calendar_icon}
          src={Clock}
          alt="Ilustração de um calendário"
        />
        <img
          className={style.arrow_icon}
          src={CaretDownGray}
          alt="Seta de abrir calendário com seleção de datas"
          onClick={onClick}
        />
      </div>
    </div>
  );
}

export default HourInput;
