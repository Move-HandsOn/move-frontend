import Header from './components/Header/Header';
import TabBar from './components/tabBar/tabBar';
import { useNavigate } from 'react-router-dom';

type LayoutProps = {
  title?: string;
  children: React.ReactNode;
};

function FeedLayout({ children, title = 'Início' }: LayoutProps) {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <div>
      <Header title={title} handleSearchClick={handleSearchClick} />
      <main>{children}</main>
      <TabBar />
    </div>
  );
}

export default FeedLayout;
