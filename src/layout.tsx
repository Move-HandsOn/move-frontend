import Header from './components/Header/Header';
import TabBar from './components/tabBar/tabBar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header title="Início" />
      <main>{children}</main>
      <TabBar />
    </div>
  );
}

export default Layout;
