import { shallow } from 'zustand/shallow';
import useProjectStore from './projectStore';

export const useSelectUserState = () => {
  return useProjectStore(
    ({
      userActiveTab,
      userName,
      userEmail,
      userIsLoggedIn,
      setUserActiveTab,
      setUserName,
      setUserEmail,
      setUserIsLoggedIn,
      clearUser,
    }) => ({
      userActiveTab,
      userName,
      userEmail,
      userIsLoggedIn,
      setUserActiveTab,
      setUserName,
      setUserEmail,
      setUserIsLoggedIn,
      clearUser,
    }),
    shallow,
  );
};
