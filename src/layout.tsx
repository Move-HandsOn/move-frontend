import Header from './components/Header/Header';
import TabBar from './components/tabBar/tabBar';

type LayoutProps = {
  title: string,
  children: React.ReactNode
}

function Layout({title ,children }: LayoutProps) {
  return (
    <div>
      <Header title={title} />
      <main>{children}</main>
      <TabBar />
    </div>
  );
}

export default Layout;
