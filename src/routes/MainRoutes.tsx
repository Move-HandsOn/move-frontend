import { Routes, Route } from 'react-router-dom';
import App from '../app.tsx';
import Feed from '../pages/Feed/Feed';
import RequireAuth from './RequireAuth';
import NewActivity from '../pages/NewActivity/NewActivity.tsx';
import Layout from '@/layout.tsx';
import NewPage from '@/pages/NewPage/NewPage.tsx';
import Groups from '@/pages/Groups/Groups.tsx';

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
            <Layout 
              title='Início'
              >
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
        path="/new-page"
        element={
          <RequireAuth>
            <NewPage />
          </RequireAuth>
        }
      />
      <Route
        path="/groups"
        element={
          <RequireAuth>
            <Layout
              title='Grupos'
              >
            <Groups />
            </Layout>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default MainRoutes;
