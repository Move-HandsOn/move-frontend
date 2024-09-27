import style from './app.module.css';
import SignIn from './pages/SignIn/SignIn';

function App() {
  return (
    <div className={style.mainPage}>
      <SignIn />
    </div>
  );
}

export default App;
