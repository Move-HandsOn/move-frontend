import ButtonStd from '@/components/ButtonStd/ButtonStd';
import ButtonWhite from '@/components/ButtonWhite/ButtonWhite';
import InputStd from '@/components/InputStd/InputStd';
import style from './SignIn.module.css';
import InputPassword from '@/components/InputPassword/InputPassword';
import { useState } from 'react';

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
      <InputStd placeholder="E-mail" />
      <InputPassword state={form.password} handleChange={handleChangeForm} />
      <ButtonStd name="Entrar" />
      <ButtonWhite name="Criar conta" />
    </div>
  );
}

export default SignIn;
