import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function RequireAuth() {
  const [cookies] = useCookies(['token'])
  const isAuth = cookies.token;

  return isAuth ? 
      <Outlet /> : 
    <Navigate to={"/"} />;
}

export default RequireAuth;
