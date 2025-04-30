import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';
import Login from './Login';

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

  // Fonction de déconnexion
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <nav className="bg-indigo-600 text-white p-4 w-full flex justify-between">
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Calculs</Link>
          <Link to="/admin" className="hover:underline">Admin</Link>
          {!user && <Link to="/login" className="hover:underline">Login</Link>}
        </div>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-sm">Connecté en tant que <strong>{user}</strong></span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Déconnexion
            </button>
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/admin"
          element={
            user === 'admin' ? (
              <Admin />
            ) : (
              <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
                <div className="p-4 text-red-500 font-semibold text-center">
                  ⛔ Accès refusé. Connecte-toi d'abord.
                </div>
              </div>
            )
          }
        />

        <Route
          path="/login"
          element={<Login onLoginSuccess={(username) => setUser(username)} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
