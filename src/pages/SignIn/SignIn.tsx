import Button from '@/components/Button/Button';
import InputStd from '@/components/InputStd/InputStd';
import style from './SignIn.module.css';
import InputPassword from '@/components/InputPassword/InputPassword';
import Logo from '../../assets/Logo.svg';
import { useForm } from "react-hook-form";

function SignIn() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = data => {
    console.log("Dados do formulário:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.signIn_container}>
      <img className={style.singIn_img} src={Logo} alt="Logo Move" />
      <h3 className={style.singIn_input_title}>Entre na sua conta</h3>
      <InputStd placeholder="E-mail" {...register("email")}/>
      <InputPassword {...register("password")} />
      <a className={style.singIn_input_text}>Esqueceu a senha ?</a>
      <Button name="Entrar" variant="standard" type="submit" />
      <Button name="Criar conta" variant="gray" />
    </form>
  );
}

export default SignIn;
