import FeedLayout from '@/FeedLayout.tsx';
import Group from '@/pages/Group/Group.tsx';
import Groups from '@/pages/Groups/Groups.tsx';
import Profile from '@/pages/Profile/Profile.tsx';
import SearchPage from '@/pages/SearchPage/SearchPage.tsx';
import ProfileLayout from '@/ProfileLayout.tsx';
import { Route, Routes } from 'react-router-dom';
import App from '../app.tsx';
import Feed from '../pages/Feed/Feed';
import NewActivity from '../pages/NewActivity/NewActivity.tsx';
import RequireAuth from './RequireAuth';

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
            <FeedLayout>
              <Feed />
            </FeedLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/new-activity"
        element={
          <RequireAuth>
            <NewActivity />
          </RequireAuth>
        }
      />

      <Route
        path="/ "
        element={
          <RequireAuth>
            <SearchPage />
          </RequireAuth>
        }
      />

      <Route
        path="/profile"
        element={
          <RequireAuth>
            <ProfileLayout>
              <Profile />
            </ProfileLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/groups"
        element={
          <RequireAuth>
            <Groups />
          </RequireAuth>
        }
      />
      <Route
        path="/group"
        element={
          <RequireAuth>
            <Group />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default MainRoutes;
