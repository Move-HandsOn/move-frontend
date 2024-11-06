import style from './PublishOptionsList.module.css';
import CaretDownGreen from '../../assets/CaretDownGreen.svg';
import { forwardRef, SelectHTMLAttributes } from 'react';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PublishOptionsList = forwardRef<HTMLSelectElement, Props>(function PublishOptionsList(
  { options, value, onChange, ...props },
  ref
) {
  return (
    <div className={style.select_container}>
      <select
        className={style.custom_select}
        ref={ref}
        {...props}
        value={value}
        onChange={onChange}
      >
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
});

export default PublishOptionsList;
