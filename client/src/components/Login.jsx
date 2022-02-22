import React, { useContext, useRef, useState } from 'react';
import { API } from '../config/api';
import { UserContext } from '../context/userContext';

function Login({ hidden, toRegister }) {
  const [state, dispatch] = useContext(UserContext);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const response = await API.post('/login', {
        email: emailRef.current.value,
        password: passRef.current.value,
      });
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data.user,
        token: response.data.token,
      });
      emailRef.current.value = '';
      passRef.current.value = '';
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        hidden();
      }, 500);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="bg-[#0D0D0D] absolute w-96 min-h-[24rem] left-1/2 -ml-48 top-1/2 -mt-[12rem] z-20 px-8 py-4 rounded-xl"
    >
      <button
        onClick={() => hidden()}
        className="text-white float-right cursor-pointer"
      >
        X
      </button>
      <span className="clear-right"></span>
      <h1 className="font-sans text-[#CD2E71] text-3xl my-6 text font-bold">
        Login
      </h1>
      {success && (
        <div
          class="bg-green-100 rounded-lg py-2 px-4 mb-4 text-base text-green-700"
          role="alert"
        >
          Login success, please wait..
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
        className="w-full text-white bg-[#D2D2D240] border-2 border-[#BCBCBC] p-2 rounded-md mb-4"
        type="password"
        ref={passRef}
        required
        placeholder="Password"
      />
      <button
        type="submit"
        className="bg-[#CD2E71] text-white text-center w-full rounded-md font-bold py-2 mt-5 mb-4"
      >
        Login
      </button>
      <p className="text-center text-white">
        Don't have an account ? Click{' '}
        <span onClick={toRegister} className="font-bold cursor-pointer">
          here
        </span>
      </p>
    </form>
  );
}

export default Login;
