import style from './HourInput.module.css';
import CaretDownGray from '../../assets/CaretDownGray.svg';
import Clock from '../../assets/Clock.svg';
import { forwardRef, SelectHTMLAttributes } from 'react';

type Props = {
  dates: { label: string, value: number }[];
  value: number;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onClick?: () => void;
  titleDefault?: string; 
} & SelectHTMLAttributes<HTMLSelectElement>; 

const HourInput = forwardRef<HTMLSelectElement, Props>(function HourInput(
  { value, onChange, onClick, dates, titleDefault, ...props }, 
  ref
) {
  return (
    <div className={style.select_container} onClick={onClick}>
      <select
        className={style.custom_select}
        value={value}
        onChange={onChange}
        {...props}
        ref={ref} 
      >
        <option value={0} disabled>
        {titleDefault ??  "Duração"}
        </option>
        {dates.map((date, index) => (
          <option key={index} value={date.value}>
            {date.label}
          </option>
        ))}
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
});

export default HourInput;
