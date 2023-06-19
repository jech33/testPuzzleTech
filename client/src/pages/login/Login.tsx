/** Libraries **/
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** Functional */
import { useSelectUserState } from '../../store/projectStore.selects';

/** Assets **/
import { MdArrowBack, MdLock, MdPerson, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { login, register } from '../../services/puzzleTechApi';

const Login = () => {
  const navigate = useNavigate();
  const { setUserIsLoggedIn, setUserEmail, setUserId } = useSelectUserState();

  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const changeToRegisterLogin = () => {
    setIsRegister((prev) => !prev);
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    try {
      const res = await login(email, password);
      setUserEmail(email);
      setUserId(res.data.user.uid);
      setUserIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      alert('Unexpected error, please review your credentials');
    }
  };

  const handleRegister = async () => {
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    try {
      const res = await register(email, password);
      res ? alert('User created successfully, please log in') : alert('User already exists');
    } catch (error) {
      alert('Unexpected error, please review your credentials');
    }
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
    <div className="container mx-auto flex h-[100svh] w-full items-center justify-center">
      <button className="btn-info btn-circle btn absolute left-5 top-5" onClick={() => navigate('/')}>
        <MdArrowBack className="text-white" size="2rem" />
      </button>
      <form className="prose flex w-full max-w-[270px] flex-col gap-2 rounded-xl border-2 border-info p-5 shadow-lg">
        <h3>{isRegister ? 'Welcome to puzzle.tech!' : 'Welcome back!'}</h3>
        <div className="flex flex-col gap-5">
          <div className="relative flex items-center">
            <MdPerson className="absolute left-4 rounded-full" />
            <input
              ref={emailRef}
              placeholder="Email address"
              className="input w-full border-gray-300 pl-11"
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className="flex flex-col">
            <div className="relative flex items-center">
              <MdLock className="absolute left-4 rounded-full" />
              <input
                ref={passwordRef}
                placeholder="Password"
                className="input w-full border-gray-300 px-11"
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
              />
              <button className="btn-circle btn absolute right-0 scale-[0.7]" onClick={handleShowPassword}>
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
            <p className="my-1 w-full text-right text-xs">
              {isRegister ? 'Already' : `Don't`} have an account?{' '}
              <span>
                <a href="#register" className="link" onClick={changeToRegisterLogin}>
                  {isRegister ? 'Log in' : 'Sign up'}
                </a>
              </span>
            </p>
          </div>
          <button className="btn-info btn" onClick={handleRegisterLogin}>
            {isRegister ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
