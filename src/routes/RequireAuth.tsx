import { Navigate } from 'react-router-dom';
// import useAuth from '@/hooks/useAuth';

type Props = {
  children: JSX.Element;
};

function RequireAuth({ children }: Props) {
  // Função desativada temporariamente para desenvolvimento, após, as linhas serão descomentadas.

  // const { handleGetToken } = useAuth();
  // const token = handleGetToken();
  // const isAuth = Boolean(token);

  const isAuth = true;

  if (!isAuth) {
    <Navigate to="/signin" />;
    return null;
  }

  return children;
}

export default RequireAuth;
