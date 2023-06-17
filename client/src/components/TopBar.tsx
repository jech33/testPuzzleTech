/** Libraries **/
import { Link } from 'react-router-dom';

/** Functional **/
import { useSelectUserState } from '../store/projectStore.selects';

/** Assets **/
import avatar from '../assets/avatar.svg';
import { MdShoppingCart } from 'react-icons/md';

const TopBar = () => {
  const { userName, userIsLoggedIn, clearUser } = useSelectUserState();

  const handleLogOut = () => {
    clearUser();
  };
  return (
    <div className="flex items-center justify-end flex-wrap bg-blue-500 p-3 gap-4 rounded-b-xl">
      {!userIsLoggedIn ? (
        <Link to={'/login'} className="btn">
          Log in
        </Link>
      ) : (
        <details className="dropdown dropdown-end">
          <summary className="btn capitalize m-0">Hey {userName || 'user'}!</summary>
          <ul className="min-w-[8rem] mt-2 p-2 shadow-lg menu dropdown-content bg-base-100 rounded-box">
            <div className="p-2 w-full flex justify-center items-center border-b-[1px] border-gray-200 mb-2">
              <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full shadow" />
            </div>
            <button onClick={handleLogOut}>
              <li>
                <p className="prose p-2 text-error hover:text-error">Log out</p>
              </li>
            </button>
          </ul>
        </details>
      )}
      <div className="btn bg-white btn-circle">
        <MdShoppingCart size="1.75rem" />
      </div>
    </div>
  );
};

export default TopBar;
