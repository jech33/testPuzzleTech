import { shallow } from 'zustand/shallow';
import useProjectStore from './projectStore';

export const useSelectUserState = () => {
  return useProjectStore(
    ({ userName, userEmail, userIsLoggedIn, setUserName, setUserEmail, setUserIsLoggedIn, clearUser }) => ({
      userName,
      userEmail,
      userIsLoggedIn,
      setUserName,
      setUserEmail,
      setUserIsLoggedIn,
      clearUser,
    }),
    shallow,
  );
};
