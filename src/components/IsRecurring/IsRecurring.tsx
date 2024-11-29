import style from './IsRecurring.module.css';
import CaretDownGray from '../../assets/CaretDownGray.svg';
import { forwardRef, SelectHTMLAttributes } from 'react';
import RecurringImg from '@/assets/RecurringImg.svg';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const  IsRecurring = forwardRef<HTMLSelectElement, Props>(function IsRecurring({ onChange, ...props }, ref) {
  return (
    <div className={style.select_container}>
      <img
        className={style.arrow_reapet}
        src={RecurringImg}
        alt="Seta de repetir evento"
      />
      <select 
        ref={ref} 
        {...props} 
        className={style.custom_select} 
        defaultValue={0}
        onChange={onChange}
      >
        <option key={1} value={1}>
          Evento se repete
        </option>
        <option key={0} value={0}>
          Evento não se repete
        </option>
      </select>
      <img
        className={style.arrow_icon}
        src={CaretDownGray}
        alt="Seta de abrir listagem de atividades"
      />
    </div>
  );
});

export default IsRecurring;
