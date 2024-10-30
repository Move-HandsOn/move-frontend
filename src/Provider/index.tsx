import { CookiesProvider } from "react-cookie";
import { Outlet } from 'react-router-dom';

export function Providers() {
  return (<CookiesProvider>
    <Outlet /> 
  </CookiesProvider>)
}
