import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { API } from '../config/api';

function MyMovies() {
  const [movies, setMovies] = useState([]);
  const [login, setLogin] = useState(false);
  async function getMovies() {
    try {
      const response = await API.get('/success-transactions');
      setMovies(response.data.transactions);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      <Navigation login={login} setLogin={(val) => setLogin(val)} />
      <div className="p-8">
        <h1 className="text-white text-sm md:text-[28px] font-bold mb-10 ml-28">
          My List Film
        </h1>
        <div className="px-8 grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 gap-8">
          {movies.map((item) => {
            return (
              <Link to={'/movie/' + item.movie.id}>
                <img
                  className="lg:w-[180px] lg:h-[250px] "
                  loading="lazy"
                  src={item.movie.image}
                  alt=""
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MyMovies;
