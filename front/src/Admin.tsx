import React, { useEffect, useState } from 'react';

type Result = {
  operation: string;
  operands: number[];
  result: number;
};

const Admin: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);

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
    <div className="h-screen w-screen flex flex-col items-start justify-start bg-gray-100 px-8 py-8">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-indigo-600">Interface d'administration</h1>

        <button
          onClick={handleClearResults}
          className="mb-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Supprimer tous les résultats
        </button>

        <ul className="space-y-2">
          {results.length === 0 ? (
            <li className="text-gray-500 italic">Aucun résultat à afficher.</li>
          ) : (
            results.map((r: any, idx: number) => (
              <li key={idx} className="border-b py-2">
                {r.n1} {r.op} {r.n2} = {r.result}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
