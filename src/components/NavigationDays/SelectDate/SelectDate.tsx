import style from './SelectDate.module.css';
import CaretDownGray from '@/assets/CaretDownGray.svg';
import { forwardRef, SelectHTMLAttributes } from 'react';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectDate = forwardRef<HTMLSelectElement, Props>(function SelectDate({ options, onChange, value, ...props }, ref) {
  const formatDate = (date: string) => {
    const dayDate = new Date(date);
    const month = dayDate.toLocaleDateString('pt-BR', { month: 'short' });
    const day = dayDate.getDate().toString().padStart(2, '0'); 
    return `${month.replace(".", "").toUpperCase()}, ${day}`;
  };

  return (
    <div className={style.select_container}>
      <select 
        ref={ref} 
        {...props} 
        className={style.custom_select}
        onChange={onChange} 
        value={value}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {formatDate(option)}
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
});

export default SelectDate;
