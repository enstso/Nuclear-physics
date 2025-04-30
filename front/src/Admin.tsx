import { useEffect, useState } from 'react';

const Admin = () => {
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    try {
      const res = await fetch('http://localhost:3001/results');
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error('Erreur de récupération des résultats', err);
    }
  };

  const clearResults = async () => {
    try {
      await fetch('http://localhost:3001/results', { method: 'DELETE' });
      fetchResults();
    } catch (err) {
      console.error('Erreur lors du nettoyage des résultats', err);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="min-h-screen w-screen flex justify-center bg-gray-100 pt-10">
      <div className="bg-white rounded shadow p-6 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          Interface d'administration
        </h1>

        <div className="flex justify-center mb-4">
          <button
            onClick={clearResults}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Supprimer tous les résultats
          </button>
        </div>

        <ul className="bg-gray-50 rounded w-full p-4 shadow-inner">
          {results.length > 0 ? (
            results.map((r: any, idx: number) => (
              <li key={idx} className="border-b py-2">
                {r.n1} {r.op} {r.n2} = {r.result}
              </li>
            ))
          ) : (
            <li className="text-gray-500">Aucun résultat pour le moment.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
