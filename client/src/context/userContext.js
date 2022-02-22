import { createContext, useReducer } from 'react';

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  user: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload, token } = action;

  switch (type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', token);

      return {
        isLogin: true,
        user: payload,
      };
    case 'CHECK_AUTH':
      return {
        isLogin: true,
        user: payload,
      };

    case 'LOGOUT':
      localStorage.removeItem('token');

      return {
        isLogin: false,
        user: {},
      };

    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
