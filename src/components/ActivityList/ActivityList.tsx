import style from './ActivityList.module.css';
import CaretDownGray from '../../assets/CaretDownGray.svg';
import { forwardRef, SelectHTMLAttributes } from 'react';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const  ActivityList = forwardRef<HTMLSelectElement, Props>(function ActivityList({ options, onChange, ...props }, ref) {
  return (
    <div className={style.select_container}>
      <select 
        ref={ref} 
        {...props} 
        className={style.custom_select} 
        onChange={onChange} 
      >
        <option hidden>
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
});

export default ActivityList;
