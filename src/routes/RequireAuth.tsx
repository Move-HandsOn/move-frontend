import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useMutation } from '@tanstack/react-query';
import { refreshToken } from '@/services/requests';
import { useEffect } from 'react';

function RequireAuth() {
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'refresh_token'])
  const isAuth = cookies.token;

  const { mutateAsync: RefreshAsync }= useMutation({
    mutationFn: () => refreshToken(cookies.refresh_token),
    onSuccess: (newToken) => {
      setCookie('token', newToken, {
        path: '/',
        maxAge: 300,
        secure: true,
        sameSite: 'strict',
      });
    },
    onError: () => {
      removeCookie('token', { path: '/' });
      removeCookie('refresh_token', { path: '/' });
    },
  });

  useEffect(() => {
    if (!isAuth) {
      RefreshAsync();
    }
  }, [isAuth, RefreshAsync]);

  return isAuth ? 
      <Outlet /> : 
    <Navigate to={"/"} />;
}

export default RequireAuth;
