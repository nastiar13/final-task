import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Buy from '../components/Buy';
import Navigation from '../components/Navigation';
import { API } from '../config/api';
import { io } from 'socket.io-client';
import { UserContext } from '../context/userContext';
let socket;

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [isBuy, setIsBuy] = useState(false);
  const [modalBuy, setModalBuy] = useState(false);
  const [alert, setAlert] = useState(false);
  const [login, setLogin] = useState(false);
  const [state] = useContext(UserContext);

  console.log(isBuy);
  async function getMovie() {
    try {
      const response = await API.get('/movie/' + id);
      const status = await API.get('/buy/' + response.data.response.id);
      setMovie(response.data.response);
      if (status.data.response) {
        setIsBuy(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handlePlay() {
    if (!isBuy) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  }

  useEffect(() => {
    getMovie();
    socket = io('http://localhost:5000', {
      query: {
        id: state.user.id,
      },
    });
    socket.on('transaction approved', () => {
      console.log('c');
      setIsBuy(true);
    });
  }, []);

  return (
    <div>
      <Navigation login={login} setLogin={(val) => setLogin(val)} />
      <div className="md:px-16 md:py-10 px-2 py-2 flex">
        {modalBuy && (
          <Buy
            movie={movie}
            socket={socket}
            close={(val) => setModalBuy(val)}
          />
        )}

        <img
          className="lg:w-[349px] lg:h-[485px] md:w-[250px] md:h-[350px] sm:w-[150px] sm:h-[250px] rounded-lg mr-16"
          src={movie.image}
          alt=""
        />

        <div>
          <div className="flex justify-between mb-8">
            <h1 className="text-white text-[42px] font-bold">{movie.title}</h1>
            {isBuy ? (
              <button className="text-white  px-4 py-2 bg-[#CD2E71] rounded-lg h-min">
                Buy Now <span className="text-green-500">✔</span>
              </button>
            ) : (
              <button
                onClick={() => setModalBuy(!modalBuy)}
                className="text-white  px-4 py-2 bg-[#CD2E71] rounded-lg h-min"
              >
                Buy Now
              </button>
            )}
          </div>

          {alert && (
            <div
              class="bg-green-100 rounded-lg py-2 px-4 mb-4 text-base text-green-700"
              role="alert"
            >
              Please buy this film if you want to watch
            </div>
          )}
          {isBuy ? (
            <iframe
              allowFullScreen="true"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              className="lg:w-[1000px] lg:h-[300px] sm:w-960 sm:h-40 border-slate-500 border-[1px] rounded-lg "
              title={movie.title}
              src={movie.url}
              frameborder="0"
            ></iframe>
          ) : (
            <div className="lg:w-[1000px] lg:h-[300px] sm:w-960 sm:h-40 border-slate-500 border-[1px] rounded-lg relative">
              <img
                onClick={handlePlay}
                src="/assets/play-button.png"
                alt="play button"
                className="w-20 absolute left-1/2 -ml-10 top-1/2 -mt-10 cursor-pointer"
              />
            </div>
          )}
          <p className="text-[#7E7E7E] mt-8 text-[23px] font-bold">
            {movie.category?.map((item) => item.category).join(',')}
          </p>
          <p className="text-[#CD2E71] font-bold lg:text-xl md:text-sm">
            Rp. {movie.price}
          </p>
          <p className="text-white lg:w-[60rem] lg:text-lg lg:leading-6 md:text-sm mt-4 md:w-[40rem] sm:text-xs">
            {movie.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Movie;
