import Button from '@/components/Button/Button';
import InputPassword from '@/components/InputPassword/InputPassword';
import InputStd from '@/components/InputStd/InputStd';
import Loading from '@/components/Loading/Loading';
import { Login } from '@/services/requests';
import { errorMessages } from '@/utils/transalate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as zod from 'zod';
import Logo from '../../assets/Logo.svg';
import style from './SignIn.module.css';

function SignIn() {
  const [loading, setLoading] = useState(false);

  const [, setCookie] = useCookies(['token', 'refresh_token']);
  const navigate = useNavigate();

  const dataLoginValidSchema = zod.object({
    email: zod.string().email('E-mail Inválido'),
    password: zod
      .string()
      .min(8, 'Preencha todos os campos')
      .max(24, 'Senha grande demais'),
  });

  type IDataLoginValidSchema = zod.infer<typeof dataLoginValidSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(dataLoginValidSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    mutateAsync: loginAsync,
    error,
    isError,
  } = useMutation({
    mutationFn: async (data: IDataLoginValidSchema) => {
      try {
        setLoading(true);

        const day7 = 60 * 60 * 24 * 7;
        const { accessToken, refreshToken } = await Login(data);
        setCookie('token', accessToken, {
          path: '/',
          maxAge: 300,
          secure: true,
          sameSite: 'strict',
        });

        setCookie('refresh_token', refreshToken, {
          path: '/',
          maxAge: day7,
          secure: true,
          sameSite: 'strict',
        });
      } catch (error) {
        const axiosError = error as AxiosError;

        throw axiosError.response?.data;
      } finally {
        setLoading(false);
      }

      navigate('/feed');
    },
  });

  function handleLogin(data: IDataLoginValidSchema) {
    loginAsync(data);
  }

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className={style.signIn_container}
    >
      <img className={style.singIn_img} src={Logo} alt="Logo Move" />

      <h3 className={style.singIn_input_title}>Entre na sua conta</h3>

      <InputStd placeholder="E-mail" {...register('email')} />

      {errors.email && errors.email.message && (
        <p className={style.error}>{errors.email.message}</p>
      )}

      {isError && error.message && (
        <p className={style.error}>{errorMessages[error.message]}</p>
      )}

      <InputPassword {...register('password')} />

      {errors.password && errors.password.message && (
        <p className={style.error}>{errors.password.message}</p>
      )}

      <a className={style.singIn_input_text}>Esqueceu a senha ?</a>

      <div className={style.groupButton}>
        <Button name="Entrar" variant="standard" type="submit" />
        <Button name="Criar conta" variant="gray" />
      </div>
      <Loading show={loading} />
    </form>
  );
}

export default SignIn;
