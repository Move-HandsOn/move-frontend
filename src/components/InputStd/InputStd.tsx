import style from './InputStd.module.css';
import { InputHTMLAttributes, forwardRef } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

const InputStd = forwardRef<HTMLInputElement, Props>(function InputStd(
  { placeholder, ...rest },
  ref
) {
  return (
    <input
      className={style.input_std}
      type="text"
      placeholder={placeholder}
      ref={ref}
      {...rest}
    />
  );
});

export default InputStd;
