import Button from '@/components/Button/Button';
import InputStd from '@/components/InputStd/InputStd';
import style from './SignIn.module.css';
import InputPassword from '@/components/InputPassword/InputPassword';
import { useState } from 'react';
import Logo from '../../assets/Logo.svg';
import Header from '@/components/Header/Header';

function SignIn() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // const [setError] = useState('');

  function handleChangeForm(event: {
    target: { name: string; value: string };
  }) {
    // setError('');
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  return (
    <div className={style.signIn_container}>
      <Header />
      <img className={style.singIn_img} src={Logo} alt="Logo Move" />
      <h3 className={style.singIn_input_title}>Entre na sua conta</h3>
      <InputStd placeholder="E-mail" />
      <InputPassword state={form.password} handleChange={handleChangeForm} />
      <a className={style.singIn_input_text}>Esqueceu a senha ?</a>
      <Button name="Entrar" variant="standard" />
      <Button name="Criar conta" variant="white" />
    </div>
  );
}

export default SignIn;
