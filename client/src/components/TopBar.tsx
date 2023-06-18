/** Libraries **/
import { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';

/** Functional **/
import { useSelectProductsState, useSelectUserState } from '../store/projectStore.selects';
import { calculateTotalQuantity } from '../utils/functions';
import CartDrawer from './CartDrawer';

/** Assets **/
import avatar from '../assets/avatar.svg';

const TopBar = () => {
  const { userName, userIsLoggedIn, clearUser } = useSelectUserState();
  const { cartProducts } = useSelectProductsState();

  const dropdownRef = useRef<HTMLUListElement>(null);

  const totalItems = useMemo(() => calculateTotalQuantity(cartProducts), [cartProducts]);

  const handleLogOut = () => {
    clearUser();
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        const details = dropdownRef.current.parentElement;
        details?.hasAttribute('open') && details?.removeAttribute('open');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="flex flex-wrap items-center justify-end gap-4 rounded-b-xl bg-blue-500 p-3 px-8">
      {!userIsLoggedIn ? (
        <Link to={'/login'} className="btn">
          Log in
        </Link>
      ) : (
        <details className="dropdown-end dropdown">
          <summary className="btn m-0 capitalize">Hey {userName || 'user'}!</summary>
          <ul
            className="dropdown-content menu rounded-box mt-2 min-w-[8rem] bg-base-100 p-2 shadow-lg"
            ref={dropdownRef}
          >
            <div className="mb-2 flex w-full items-center justify-center border-b-[1px] border-gray-200 p-2">
              <img src={avatar} alt="avatar" className="h-10 w-10 rounded-full shadow" />
            </div>
            <button onClick={handleLogOut}>
              <li>
                <p className="prose p-2 text-error hover:text-error">Log out</p>
              </li>
            </button>
          </ul>
        </details>
      )}
      {userIsLoggedIn ? (
        <div className="indicator">
          {totalItems > 0 ? (
            <span className="badge badge-secondary indicator-item text-white">
              {totalItems < 1000 ? totalItems : '999+'}
            </span>
          ) : null}
          <CartDrawer />
        </div>
      ) : null}
    </div>
  );
};

export default TopBar;
