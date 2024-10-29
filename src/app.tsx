import style from './app.module.css';
import Feed from './pages/Feed/Feed';
import SignIn from './pages/SignIn/SignIn';
import NewActivity from './pages/NewActivity/NewActivity';
import SearchPage from './pages/SearchPage/SearchPage';
import { Providers } from '@/utils/providers';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <div className={style.containerMain}>
      <div className={style.main}>
        <Providers>
          <SignIn />
          <Feed />
          <NewActivity />
          <SearchPage />
          <Profile />
        </Providers>
      </div>
    </div>
  );
}

export default App;
