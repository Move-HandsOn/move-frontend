import { Routes, Route } from 'react-router-dom';
import App from '../app.tsx';
import Feed from '../pages/Feed/Feed';
import RequireAuth from './RequireAuth';
import NewActivity from '../pages/NewActivity/NewActivity.tsx';
import FeedLayout from '@/FeedLayout.tsx';
import SearchPage from '@/pages/SearchPage/SearchPage.tsx';
import Profile from '@/pages/Profile/Profile.tsx';
import ProfileLayout from '@/ProfileLayout.tsx';
import Groups from '@/pages/Groups/Groups.tsx';
import Group from '@/pages/Group/Group.tsx';

function MainRoutes() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<App />} />
      <Route path="/new-activity" element={<NewActivity />} />
      <Route path="/feed" element={<Feed />} />

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
