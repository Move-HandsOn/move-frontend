import { Routes, Route } from 'react-router-dom';
import App from '../app.tsx';

// import SignIn from '../pages/SignIn/SignIn';
import Feed from '../pages/Feed/Feed';
import RequireAuth from './RequireAuth';
import NewActivity from '../pages/NewActivity/NewActivity.tsx';

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
      <Route
        path="/newactivity"
        element={
          <RequireAuth>
            <NewActivity />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default MainRoutes;
