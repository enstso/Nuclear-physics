import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Result = {
  n1: number;
  op: string;
  n2: number;
  result: number;
};

const Admin: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const fetchResults = async () => {
    try {
      const res = await fetch('http://localhost:3000/results');
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Erreur lors de la récupération des résultats :", err);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleClearResults = async () => {
    try {
      const res = await fetch('http://localhost:3000/results', {
        method: 'DELETE',
      });

      if (res.ok) {
        setResults([]);
        alert("✅ Tous les résultats ont été supprimés.");
      } else {
        console.error('Erreur lors de la suppression');
        alert("❌ Échec de la suppression.");
      }
    } catch (err) {
      console.error('Erreur réseau lors de la suppression :', err);
      alert("⚠️ Erreur réseau.");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center bg-gray-100 py-10">
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">Interface d'administration</h1>

      <button
        onClick={handleClearResults}
        className="mb-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Supprimer tous les résultats
      </button>

      <ul className="space-y-2 w-full max-w-lg">
        {results.length === 0 ? (
          <li className="text-gray-500 italic">Aucun résultat à afficher.</li>
        ) : (
          results.map((r, idx) => (
            <li key={idx} className="border-b py-2 text-center">
              {r.n1} {r.op} {r.n2} = {r.result}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Admin;
