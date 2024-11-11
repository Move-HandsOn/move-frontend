import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';
import { refreshToken } from '@/services/requests';

function RequireAuth() {
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'refresh_token'])
  const isAuth = cookies.token;

  const { isError } = useQuery({
    queryKey: ['refreshToken', cookies.refresh_token],
    queryFn: async () => {
      const newToken = await refreshToken(cookies.refresh_token);
      setCookie('token', newToken, {
        path: '/',
        maxAge: 300,
        secure: true,
        sameSite: 'strict',
      });
      return newToken
    },
    staleTime: 185,
  });

  if(isError){
    removeCookie('token', { path: '/' });
    removeCookie('refresh_token', { path: '/' });
  }

  return isAuth ? <Outlet /> : <Navigate to={'/'} />;
}

export default RequireAuth;
