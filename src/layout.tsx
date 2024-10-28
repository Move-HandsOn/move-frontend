import Header from './components/Header/Header';
import TabBar from './components/tabBar/tabBar';
import { useNavigate } from 'react-router-dom';

function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <div>
      <Header title="Início" handleSearchClick={handleSearchClick} />
      <main>{children}</main>
      <TabBar />
    </div>
  );
}

export default Layout;
