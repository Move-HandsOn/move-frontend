import style from './app.module.css';
import Feed from './pages/Feed/Feed';
import SignIn from './pages/SignIn/SignIn';
import NewActivity from './pages/NewActivity/NewActivity';

function App() {
  return (
    <div className={style.containerMain}>
      <div className={style.main}>
        <SignIn />
        <Feed />
        <NewActivity />

        <div className={style.header}></div>
        <div className={style.content}></div>
        <div className={style.footer}></div>
      </div>
    </div>
  );
}

export default App;
