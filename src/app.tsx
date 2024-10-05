import style from './app.module.css';
// import TabBar from './components/tabBar/tabBar';
// import Feed from './pages/Feed/Feed';
// import SignIn from './pages/SignIn/SignIn';
import NewActivity from './pages/NewActivity/NewActivity';

function App() {
  return (
    <div className={style.containerMain}>
      <div className={style.main}>
        <div className={style.header}></div>
        <div className={style.content}>
          <NewActivity />
          {/* <SignIn /> */}
        </div>
        <div className={style.footer}>{/* <TabBar /> */}</div>
      </div>
    </div>
  );
}

export default App;
