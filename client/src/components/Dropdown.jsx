import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Link, useNavigate } from 'react-router-dom';

function Dropdown() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();
  function logout() {
    dispatch({
      type: 'LOGOUT',
    });
    navigate('/');
  }
  if (state.user.email === 'admin@gmail.com') {
    return (
      <div className="bg-black sm:w-44 lg:w-60 md:w-52 py-4 px-6 rounded-lg border-white border-[1px]">
        <Link to="/add-movie" className="flex items-center mb-4">
          <img
            className="lg:w-6 md:w-5 sm:w-5 mr-4"
            src="/assets/add-movie.png"
            alt="user"
          />
          <p className="text-white font-bold sm:text-xs lg:text-lg md:text-lg ">
            Add Film
          </p>
        </Link>

        <div className="w-full h-[1px] bg-white absolute z-10 left-0"></div>

        <div onClick={logout} className="flex items-center mt-8 cursor-pointer">
          <img
            className="lg:w-6 md:w-5 sm:w-5 mr-4"
            src="/assets/logout.png"
            alt="user"
          />
          <p className="text-white font-bold sm:text-xs lg:text-lg md:text-lg ">
            Logout
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-black sm:w-44 lg:w-60 md:w-52 py-4 px-6 rounded-lg border-white border-[1px]">
        <Link to="/profile" className="flex items-center mb-4">
          <img
            className="lg:w-6 md:w-5 sm:w-5 mr-4"
            src="/assets/user.png"
            alt="user"
          />
          <p className="text-white font-bold sm:text-xs lg:text-lg md:text-lg ">
            Profile
          </p>
        </Link>
        <Link to="/my-movies" className="flex items-center mb-4">
          <img
            className="lg:w-6 md:w-5 sm:w-5 mr-4"
            src="/assets/clapperboard.png"
            alt="user"
          />
          <p className="text-white font-bold sm:text-xs lg:text-lg md:text-lg ">
            My List Movie
          </p>
        </Link>

        <div className="w-full h-[1px] bg-white absolute z-10 left-0"></div>

        <div onClick={logout} className="flex items-center mt-8 cursor-pointer">
          <img
            className="lg:w-6 md:w-5 sm:w-5 mr-4"
            src="/assets/logout.png"
            alt="user"
          />
          <p className="text-white font-bold sm:text-xs lg:text-lg md:text-lg ">
            Logout
          </p>
        </div>
      </div>
    );
  }
}

export default Dropdown;
