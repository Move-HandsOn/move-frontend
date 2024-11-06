import EyeLash from '../../assets/EyeSlash.svg';
import Eye from '../../assets/Eye.svg';
import { forwardRef, InputHTMLAttributes, useState } from 'react';
import style from './InputPassword.module.css';

type Props = InputHTMLAttributes<HTMLInputElement>;

const InputPassword = forwardRef<HTMLInputElement, Props>(function InputPassword(
  {...rest },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={style.input_password_container}>
      <input
        className={style.input_password}
        type={showPassword ? 'text' : 'password'}
        placeholder="Senha"
        ref={ref}
        {...rest}
      />

      <img
        className={style.input_password_img}
        src={showPassword ? Eye : EyeLash}
        alt="mostrar senha"
        onClick={() => setShowPassword(!showPassword)}
      />
    </div>
  );
})

export default InputPassword;
