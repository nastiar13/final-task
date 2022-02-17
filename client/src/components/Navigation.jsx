import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import Login from './Login';
import Register from './Register';
import Dropdown from './Dropdown';

function Navigation() {
  const [state] = useContext(UserContext);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  function toLogin() {
    setRegister(false);
    setLogin(!login);
  }
  function toRegister() {
    setLogin(false);
    setRegister(!register);
  }

  return (
    <div>
      <div className="flex bg-black py-4 px-16 justify-between items-center">
        <img src="/assets/logo.png" alt="" />
        {state.isLogin ? (
          <div className="relative">
            <img
              src={state.user.url}
              alt="profile"
              className="rounded-full w-10 border-2 border-red-500"
            />
            <div className="absolute sm:-left-28 lg:-left-44 md:-left-28 top-16">
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
