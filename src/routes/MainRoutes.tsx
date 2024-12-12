import FeedLayout from '@/FeedLayout';
import Agenda from '@/pages/Agenda/Agenda';
import Groups from '@/pages/Groups/Groups';
import NewEvent from '@/pages/NewEvent/NewEvent';
import NewGroup from '@/pages/NewGroup/NewGroup';
import Profile from '@/pages/Profile/Profile';
import SearchPage from '@/pages/SearchPage/SearchPage';
import ProfileLayout from '@/ProfileLayout';
import { Providers } from '@/Provider/index';
import { Route, Routes } from 'react-router-dom';
import App from '../app';
import Feed from '../pages/Feed/Feed';
import NewActivity from '../pages/NewActivity/NewActivity';
import Notifications from '../pages/Notifications/Notifications';
import IsPublic from './IsPublic.jsx';
import RequireAuth from './RequireAuth';
import LayoutGroups from '@/layouts/LayoutGroups';
import { EventsByGroups } from '@/pages/EventsByGroups/EventsByGroups';
import { ActivitiesByGroups } from '@/pages/ActivitiesByGroups/ActivitiesByGroups';
import { RequestsByGroups } from '@/pages/RequestsByGroups/RequestsByGroups';

function MainRoutes() {
  return (
    <Routes>
      <Route element={<Providers />}>
        <Route element={<IsPublic />}>
          <Route path="/" element={<App />} />
        </Route>

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
          <Route path="/new-event" element={<NewEvent />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/profile"
            element={
              <ProfileLayout>
                <Profile />
              </ProfileLayout>
            }
          />
          <Route path="/profile/notifications" element={<Notifications />} />
          <Route path="/groups" element={<Groups />} />
          <Route element={<LayoutGroups />}>
            <Route path="/group-detail/:id/events" element={<EventsByGroups />} />
            <Route path="/group-detail/:id/activities" element={<ActivitiesByGroups />} />
            <Route path="/group-detail/:id/requests" element={<RequestsByGroups />} />
          </Route>
          <Route path="/schedule" element={<Agenda />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default MainRoutes;
