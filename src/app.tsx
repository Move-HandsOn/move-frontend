import { Providers } from '@/utils/providers';
import style from './app.module.css';
import SignIn from './pages/SignIn/SignIn';

function App() {
  return (
    <div className={style.containerMain}>
      <div className={style.main}>
        <Providers>
          <SignIn />
        </Providers>
      </div>
    </div>
  );
}

export default App;
