import { Routes, Route } from 'react-router-dom';


// import SignIn from '../pages/SignIn/SignIn';
import Feed from '../pages/Feed/Feed';
import RequireAuth from './RequireAuth';
import App from '@/app';
function MainRoutes() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<App />} />

      {/* Rotas Protegidas */}
      <Route
        path="/feed"
        element={
          <RequireAuth>
            <Feed />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default MainRoutes;
