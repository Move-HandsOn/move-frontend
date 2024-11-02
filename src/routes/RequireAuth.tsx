import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function RequireAuth() {
  const [cookies] = useCookies(['token']);
  // const isAuth = cookies.token;
  const isAuth = true;

  return isAuth ? <Outlet /> : <Navigate to={'/'} />;
}

export default RequireAuth;
