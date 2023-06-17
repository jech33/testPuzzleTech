import TabPanel from '../../components/TabPanel';
import TopBar from '../../components/TopBar';

const Dashboard = () => {
  return (
    <div className="container mx-auto flex flex-col w-full h-[100svh] gap-5">
      <TopBar />
      <TabPanel />
    </div>
  );
};

export default Dashboard;
