import React, { useContext, useEffect, useRef } from 'react';

import { API } from '../config/api';
import { UserContext } from '../context/userContext';

function Buy({ close, movie, socket }) {
  const [state] = useContext(UserContext);
  const accRef = useRef(null);
  const billRef = useRef(null);
  async function handleBuy(e) {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.set('user_id', state.user.id);
      formData.set('movies_id', movie.id);
      formData.set('media', billRef.current.files[0]);
      formData.set('number_account', accRef.current.value);
      formData.set('price', movie.price);
      const response = await API.post('/transaction', formData);

      socket.emit('add transaction');
      close();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleBuy}
      className="bg-[#0D0D0D] absolute w-128 min-h-[24rem] left-1/2 -ml-64 top-1/2 -mt-[12rem] z-20 px-8 py-6 rounded-xl"
    >
      <button
        onClick={() => close(false)}
        className="text-white float-right cursor-pointer"
      >
        X
      </button>
      <span className="clear-right"></span>
      <p className="text-white text-center text-[24px] font-bold mt-6 mb-10">
        Cinema<span className="text-[#CD2E71]">Online</span> : 0981312323
      </p>
      <p className="text-white text-[24px] font-bold mb-4">{movie.title}</p>
      <p className="text-white text-[18px] font-normal mb-7">
        Total : <span className="text-[#CD2E71]">Rp. {movie.price}</span>
      </p>
      <input
        ref={accRef}
        className="w-full text-white bg-[#D2D2D240] border-2 border-[#BCBCBC] p-2 rounded-md mb-6 appearance-none"
        type="number"
        required
        placeholder="Input Your Account Number"
      />
      <input required ref={billRef} type="file" hidden id="bill" />
      <label
        htmlFor="bill"
        className="flex text-white bg-[#CD2E71] px-4 py-2 rounded-lg w-fit"
      >
        Attach Payment <img src="/assets/payment.png" alt="" />
      </label>
      <button
        type="submit"
        className="bg-[#CD2E71] text-white text-center w-full rounded-md font-bold py-2 mt-5 mb-4"
      >
        Pay
      </button>
    </form>
  );
}

export default Buy;
