/** Libraries **/
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** Functional */
import { useSelectUserState } from '../../store/projectStore.selects';

/** Assets **/
import { MdArrowBack, MdLock, MdPerson, MdVisibility, MdVisibilityOff } from 'react-icons/md';

const Login = () => {
  const navigate = useNavigate();
  const { setUserIsLoggedIn } = useSelectUserState();

  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const changeToRegisterLogin = () => {
    setIsRegister((prev) => !prev);
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setUserIsLoggedIn(true);
    navigate('/');
  };

  const handleRegister = () => {
    console.log('register');
  };

  const handleRegisterLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    isRegister ? handleRegister() : handleLogin(e);
  };

  const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="container mx-auto flex items-center justify-center h-[100svh] w-full">
      <button className="absolute left-5 top-5 btn btn-primary btn-circle" onClick={() => navigate('/')}>
        <MdArrowBack className="text-white" size="2rem" />
      </button>
      <form className="prose flex flex-col w-full shadow-lg border-2 border-primary p-5 max-w-[270px] rounded-xl gap-2">
        <h3>{isRegister ? 'Welcome to puzzle.tech!' : 'Welcome back!'}</h3>
        <div className="flex flex-col gap-5">
          <div className="relative flex items-center">
            <MdPerson className="absolute left-4 rounded-full" />
            <input
              placeholder="Email address"
              className="input border-gray-300 w-full pl-11"
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className="flex flex-col">
            <div className="relative flex items-center">
              <MdLock className="absolute left-4 rounded-full" />
              <input
                placeholder="Password"
                className="input border-gray-300 w-full px-11"
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
              />
              <button className="absolute right-0 btn btn-circle scale-[0.7]" onClick={handleShowPassword}>
                <label className="swap">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      e.stopPropagation();
                      setShowPassword((prev) => !prev);
                    }}
                    checked={showPassword}
                  />
                  <MdVisibilityOff className="swap-on" size="1.5rem" />
                  <MdVisibility className="swap-off" size="1.5rem" />
                </label>
              </button>
            </div>
            <p className="text-xs text-right w-full my-1">
              {isRegister ? 'Already' : `Don't`} have an account?{' '}
              <span>
                <a href="#register" className="link" onClick={changeToRegisterLogin}>
                  {isRegister ? 'Log in' : 'Sign up'}
                </a>
              </span>
            </p>
          </div>
          <button className="btn btn-primary" onClick={handleRegisterLogin}>
            {isRegister ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
