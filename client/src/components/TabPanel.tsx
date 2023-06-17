/** Libraries **/
import { MouseEvent } from 'react';

/** Functional **/
import { useSelectUserState } from '../store/projectStore.selects';
import AllProducts from './AllProducts';

const TabPanel = () => {
  const { userActiveTab, userIsLoggedIn, setUserActiveTab } = useSelectUserState();

  const tabs = [
    { value: 1, label: 'All products', element: <AllProducts /> },
    { value: 2, label: 'My Orders' },
  ];

  const handlePanelClick = (e: MouseEvent<HTMLElement>) => {
    const tabSelected = Number(e.currentTarget.dataset.value);
    setUserActiveTab(tabSelected);
  };

  return (
    <div className="flex flex-col gap-3 flex-grow overflow-hidden">
      <div className="tabs tab-bordered pb-2 w-full [&_.tab-active]:!bg-blue-100">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`tab rounded-lg ${tab.value === userActiveTab && 'tab-active'}`}
            data-value={tab.value}
            onClick={handlePanelClick}
            disabled={tab.value === 2 && !userIsLoggedIn}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex justify-center px-3 overflow-scroll">
        {tabs.filter((tab) => tab.value === userActiveTab)[0].element}
      </div>
    </div>
  );
};

export default TabPanel;
