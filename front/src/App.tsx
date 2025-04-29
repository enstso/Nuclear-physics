import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';

const App = () => {
  return (
    <Router>
      <nav className="bg-indigo-600 text-white p-4 flex justify-between">
        <Link to="/" className="hover:underline">Calculs</Link>
        <Link to="/admin" className="hover:underline">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
