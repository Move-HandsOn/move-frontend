import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function IsPublic() {
  const [cookies] = useCookies(['token'])
  const isAuth = cookies.token;

  return !isAuth ? <Outlet /> : <Navigate to={'/feed'} />;
}

export default IsPublic;
