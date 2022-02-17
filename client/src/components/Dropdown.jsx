import React from 'react';

function Dropdown() {
  return (
    <div className="bg-black sm:w-44 lg:w-60 md:w-52 p-6 rounded-lg border-white border-[1px]">
      <div className="flex items-center mb-4">
        <img
          className="lg:w-6 md:w-5 sm:w-5 mr-4"
          src="/assets/user.png"
          alt="user"
        />
        <p className="text-white font-bold sm:text-xs lg:text-lg md:text-lg ">
          Profile
        </p>
      </div>
      <div className="flex items-center mb-4">
        <img
          className="lg:w-6 md:w-5 sm:w-5 mr-4"
          src="/assets/clapperboard.png"
          alt="user"
        />
        <p className="text-white font-bold sm:text-xs lg:text-lg md:text-lg ">
          My List Movie
        </p>
      </div>

      <div className="w-full h-[1px] bg-white absolute z-10 left-0"></div>

      <div className="flex items-center mt-8">
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

export default Dropdown;
