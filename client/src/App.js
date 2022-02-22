import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import { useContext, useEffect, useState } from 'react';
import Admin from './pages/Admin';
import { UserContext } from './context/userContext';
import { API, setAuthToken } from './config/api';
import Movie from './pages/Movie';
import Profile from './pages/Profile';
import MyMovies from './pages/MyMovies';
import AddMovie from './pages/AddMovie';

function App() {
  const [state, dispatch] = useContext(UserContext);
  setAuthToken(localStorage.token);
  async function checkAuth() {
    try {
      const response = await API.get('/check-auth/');
      dispatch({
        type: 'CHECK_AUTH',
        payload: response.data.user,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      checkAuth();
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          index
          path="/"
          element={
            state.user.email === 'admin@gmail.com' ? <Admin /> : <Landing />
          }
        />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-movies" element={<MyMovies />} />
        <Route path="/add-movie" element={<AddMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
