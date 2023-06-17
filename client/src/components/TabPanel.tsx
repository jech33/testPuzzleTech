import { MouseEvent } from 'react';
import { useSelectUserState } from '../store/projectStore.selects';

const TabPanel = () => {
  const { userActiveTab, setUserActiveTab } = useSelectUserState();

  const tabs = [
    { value: 1, label: 'All products' },
    { value: 2, label: 'My Orders' },
  ];

  const handlePanelClick = (e: MouseEvent<HTMLElement>) => {
    const tabSelected = Number(e.currentTarget.dataset.value);
    setUserActiveTab(tabSelected);
  };

  return (
    <div className="tabs tab-bordered pb-2 w-full [&_.tab-active]:!bg-blue-100">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`tab rounded-lg ${tab.value === userActiveTab && 'tab-active'}`}
          data-value={tab.value}
          onClick={handlePanelClick}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabPanel;
