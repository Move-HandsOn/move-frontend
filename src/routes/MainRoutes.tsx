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
import { Providers } from '@/Provider/index.tsx';
import NewGroup from '@/pages/NewGroup/NewGroup.tsx';
import Agenda from '@/pages/Agenda/Agenda.tsx';

function MainRoutes() {
  return (
    <Routes>
      <Route element={<Providers />}>
        <Route path="/" element={<App />} />

        <Route element={<RequireAuth />}>
          <Route
            path="/feed"
            element={
              <FeedLayout>
                <Feed />
              </FeedLayout>
            }
          />
          <Route path="/new-activity" element={<NewActivity />} />
          <Route path="/new-group" element={<NewGroup />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/profile"
            element={
              <ProfileLayout>
                <Profile />
              </ProfileLayout>
            }
          />
          <Route path="/groups" element={<Groups />} />
          <Route path="/group" element={<Group />} />
          <Route path="/schedule" element={<Agenda />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default MainRoutes;
