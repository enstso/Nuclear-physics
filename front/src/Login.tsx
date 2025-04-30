import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  onLoginSuccess: (username: string) => void;
};

const Login: React.FC<Props> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'adminpassword') {
      localStorage.setItem("isAdmin", "true"); // ✅ Enregistre que l'admin est connecté
      onLoginSuccess(username);
      navigate('/admin');
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center bg-gray-100 py-20">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">Connexion</h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Nom d'utilisateur</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block">Mot de passe</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
