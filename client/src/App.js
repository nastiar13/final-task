import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Navigation />} />
      </Routes>
    </Router>
  );
}

export default App;
