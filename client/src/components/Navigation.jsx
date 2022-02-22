import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import Login from './Login';
import Register from './Register';
import Dropdown from './Dropdown';
import { useNavigate } from 'react-router';

function Navigation({ login, setLogin }) {
  const [state] = useContext(UserContext);
  const navigate = useNavigate();

  const [register, setRegister] = useState(false);
  const [dropdown, setDropdown] = useState(true);

  function toLogin() {
    setRegister(false);
    setLogin(!login);
  }
  function toRegister() {
    setLogin(false);
    setRegister(!register);
  }

  useEffect(() => {
    setDropdown(true);
  }, []);

  return (
    <div>
      <div className="flex bg-black py-4 px-16 justify-between items-center">
        <img
          onClick={() => navigate('/')}
          src="/assets/logo.png"
          className="cursor-pointer"
          alt="logo"
        />
        {state.isLogin ? (
          <div className="relative">
            <img
              onClick={() => setDropdown(!dropdown)}
              src={state.user.url ? state.user.url : '/assets/user.png'}
              alt="profile"
              className="rounded-full w-10 border-2 border-red-500 cursor-pointer"
            />
            <div
              hidden={dropdown}
              className="absolute sm:-left-28 lg:-left-44 md:-left-28 top-16 z-20"
            >
              <Dropdown />
            </div>
          </div>
        ) : (
          <div>
            <button onClick={toLogin} className="text-white">
              Login
            </button>
            <button
              onClick={toRegister}
              className="text-white bg-[#CD2E71] px-3 py-1 font-sans rounded-lg text-center ml-6"
            >
              Register
            </button>
          </div>
        )}
      </div>
      {login && (
        <div hidden={!login}>
          <Login hidden={() => setLogin(!login)} toRegister={toRegister} />
        </div>
      )}
      {register && (
        <div hidden={!register}>
          <Register hidden={() => setRegister(!register)} toLogin={toLogin} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
