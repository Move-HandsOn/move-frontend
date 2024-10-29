import TabBar from './components/tabBar/tabBar';

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main>{children}</main>
      <TabBar />
    </div>
  );
}

export default ProfileLayout;
