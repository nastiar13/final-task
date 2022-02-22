import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../config/api';
import { UserContext } from '../context/userContext';
import Navigation from '../components/Navigation';

function Landing() {
  let navigate = useNavigate();
  const [state] = useContext(UserContext);
  const [movies, setMovies] = useState([]);
  const [login, setLogin] = useState(false);

  function handleBuy() {
    if (state.isLogin) {
      navigate('/movie/2');
    } else {
      setLogin(true);
    }
  }
  async function getAllMovie() {
    try {
      const response = await API.get('/movies');
      setMovies(response.data.response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllMovie();
  }, []);
  return (
    <div>
      <Navigation login={login} setLogin={(val) => setLogin(val)} />
      <div className="bg-black ">
        <div className="relative mb-10 lg:px-56 md:px-20 sm:px-4 py-12">
          <img
            src="https://res.cloudinary.com/dv0sonkcj/image/upload/v1645170264/dp-hero_gyoncf.png"
            alt=""
          />
          <div className="lg:w-[40rem] md:w-[40rem] sm:w-[30rem] lg:h-[20rem] md:h-12rem absolute lg:top-24 md:top-24 sm:top-4 md:left-[10rem] lg:left-[18rem] md:visible invisible">
            <img
              className=" lg:w-32 md:w-20 sm:w-16"
              src="/assets/Deadpool-text.png"
              alt=""
            />
            <p className="text-white font-bold lg:text-xl md:text-sm mt-6">
              Action
            </p>
            <p className="text-[#CD2E71] font-bold lg:text-xl md:text-sm">
              Rp 49.000
            </p>
            <p className="text-white lg:w-[50rem] lg:text-sm lg:leading-6 md:text-sm mt-4 md:w-[40rem] sm:text-xs">
              This is the origin story of former Special Forces operative turned
              mercenary Wade Wilson, who after being subjected to a rogue
              experiment that leaves him with accelerated healing powers, adopts
              the alter ego Deadpool. Armed with his new abilities and a dark,
              twisted sense of humor, Deadpool hunts down the man who nearly
              destroyed his life.
            </p>
            <button
              onClick={handleBuy}
              className="bg-[#CD2E71] text-white font-bold lg:text-sm md:text-xs lg:px-4 md:px-3 sm:px-2 lg:py-2 md:py-2 sm:py-1 rounded-lg mt-4"
            >
              Buy Now
            </button>
          </div>
        </div>
        <div className="h-fit pb-40 px-2 md:px-16">
          <h3 className="text-white text-sm md:text-[28px] font-bold mb-10">
            List Film
          </h3>
          <div className="px-8 grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 gap-8">
            {movies.map((item) => {
              if (state.isLogin) {
                return (
                  <Link to={'/movie/' + item.id}>
                    <img
                      className="lg:w-[180px] lg:h-[250px] "
                      loading="lazy"
                      src={item.image}
                      alt=""
                    />
                  </Link>
                );
              } else {
                return (
                  <div>
                    <img
                      className="lg:w-[180px] lg:h-[250px] "
                      loading="lazy"
                      src={item.image}
                      alt=""
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
