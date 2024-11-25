import style from './SelectGroup.module.css';
import CaretDownGray from '../../assets/CaretDownGray.svg';
import { forwardRef, SelectHTMLAttributes } from 'react';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

const  SelectGroup = forwardRef<HTMLSelectElement, Props>(function SelectGroup({ options, onChange, ...props }, ref) {
  return (
    <div className={style.select_container}>
      <select 
        ref={ref} 
        {...props} 
        className={style.custom_select} 
        onChange={onChange} 
      >
        <option hidden>
          Selecione o grupo que você quer postar
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
        alt="Seta de abrir listagem de grupos"
      />
    </div>
  );
});

export default SelectGroup;
