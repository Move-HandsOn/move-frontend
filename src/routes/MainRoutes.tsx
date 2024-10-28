import { Routes, Route } from 'react-router-dom';
import App from '../app.tsx';
import Feed from '../pages/Feed/Feed';
import RequireAuth from './RequireAuth';
import NewActivity from '../pages/NewActivity/NewActivity.tsx';
import Layout from '@/layout.tsx';
import SearchPage from '@/pages/SearchPage/SearchPage.tsx';

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
            <Layout>
              <Feed />
            </Layout>
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

      <Route
        path="/search"
        element={
          <RequireAuth>
            <SearchPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default MainRoutes;
