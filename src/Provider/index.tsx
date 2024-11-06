import { CookiesProvider } from "react-cookie";
import { Outlet } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export function Providers() {
  return (<CookiesProvider>
    <QueryClientProvider client={queryClient}>
      <Outlet /> 
    </QueryClientProvider>
  </CookiesProvider>)
}
