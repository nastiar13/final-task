import React, { useRef, useState } from 'react';
import { API } from '../config/api';

function Register({ hidden, toLogin }) {
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const fnameRef = useRef(null);
  const [success, setSuccess] = useState(false);
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await API.post('/register', {
        email: emailRef.current.value,
        password: passRef.current.value,
        full_name: fnameRef.current.value,
      });
      emailRef.current.value = '';
      passRef.current.value = '';
      fnameRef.current.value = '';
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        toLogin();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="bg-[#0D0D0D] absolute w-96 min-h-[28rem] left-1/2 -ml-48 top-1/2 -mt-[14rem] z-20 px-8 py-4 rounded-xl"
    >
      <button
        onClick={() => hidden()}
        className="text-white float-right cursor-pointer"
      >
        X
      </button>
      <span className="clear-right"></span>

      <h1 className="font-sans text-[#CD2E71] text-3xl my-6 text font-bold">
        Register
      </h1>
      {success && (
        <div
          class="bg-green-100 rounded-lg py-2 px-4 mb-4 text-base text-green-700"
          role="alert"
        >
          Success registered account, redirecting..
        </div>
      )}
      <input
        className="w-full text-white bg-[#D2D2D240] border-2 border-[#BCBCBC] p-2 rounded-md mb-6"
        type="email"
        ref={emailRef}
        required
        placeholder="Email"
      />
      <input
        className="w-full text-white bg-[#D2D2D240] border-2 border-[#BCBCBC] p-2 rounded-md mb-6"
        type="password"
        ref={passRef}
        required
        placeholder="Password"
      />
      <input
        className="w-full text-white bg-[#D2D2D240] border-2 border-[#BCBCBC] p-2 rounded-md mb-4"
        type="text"
        ref={fnameRef}
        required
        placeholder="Fullname"
      />
      <button className="bg-[#CD2E71] text-white text-center w-full rounded-md font-bold py-2 mt-5 mb-4">
        Register
      </button>
      <p className="text-center text-white">
        Already have an account ? Click{' '}
        <span onClick={toLogin} className="font-bold cursor-pointer">
          here
        </span>
      </p>
    </form>
  );
}

export default Register;
