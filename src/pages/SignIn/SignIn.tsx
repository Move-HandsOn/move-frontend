import ButtonStd from '@/components/ButtonStd/ButtonStd';
import ButtonWhite from '@/components/ButtonWhite/ButtonWhite';
import InputStd from '@/components/InputStd/InputStd';
import style from './SignIn.module.css';

function SignIn() {
  return (
    <div className={style.signIn_container}>
      <InputStd placeholder="E-mail" />
      <ButtonStd name="Entrar" />
      <ButtonWhite name="Criar conta" />
    </div>
  );
}

export default SignIn;
