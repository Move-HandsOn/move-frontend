import style from './DateInput.module.css';
import CaretDownGray from '../../assets/CaretDownGray.svg';
import CalendarBlank from '../../assets/CalendarBlank.svg';

type Props = {
  dates: string[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

function DateInput({ dates, value, onChange }: Props) {
  return (
    <div className={style.select_container}>
      <select className={style.custom_select} value={value} onChange={onChange}>
        <option value="" disabled selected>
          Quando?
        </option>

        {/* {dates.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))} */}
      </select>
      <div className={style.icon_container}>
        <img
          className={style.calendar_icon}
          src={CalendarBlank}
          alt="Ilustração de um calendário"
        />
        <img
          className={style.arrow_icon}
          src={CaretDownGray}
          alt="Seta de abrir calendário com seleção de datas"
        />
      </div>
    </div>
  );
}

export default DateInput;
