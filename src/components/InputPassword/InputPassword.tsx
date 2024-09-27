import EyeLash from '../../assets/EyeSlash.svg';
import Eye from '../../assets/Eye.svg';
import { useState } from 'react';
import style from './InputPassword.module.css';

type Props = {
  state: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputPassword({ state, handleChange }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={style.input_password_container}>
      <input
        className={style.input_password}
        name="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Senha"
        value={state}
        onChange={(event) => handleChange(event)}
      />

      <img
        className={style.input_password_img}
        src={showPassword ? Eye : EyeLash}
        alt="mostrar senha"
        onClick={() => setShowPassword(!showPassword)}
      />
    </div>
  );
}

export default InputPassword;
