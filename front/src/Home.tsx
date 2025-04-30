import { useState, useEffect } from 'react';

const operations = ['add', 'sub', 'mul', 'div', 'all'];

function App() {
  const [n1, setN1] = useState('');
  const [n2, setN2] = useState('');
  const [op, setOp] = useState('add');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:3001/results')
        .then(res => res.json())
        .then(data => setResults(data))
        .catch(err => console.error(err));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const sendRequest = async () => {
    const payload = {
      n1: parseInt(n1),
      n2: parseInt(n2),
      op: op,
    };

    try {
      const response = await fetch('http://localhost:3001/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Échec de l'envoi");

      alert('Requête envoyée !');
      setN1('');
      setN2('');
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'envoi");
    }
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl p-6 bg-white rounded shadow flex flex-col items-center">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">Interface de Calcul Distribué</h2>
  
        <div className="flex flex-wrap gap-2 mb-4">
          <input
            className="border p-2 rounded"
            type="number"
            value={n1}
            placeholder="n1"
            onChange={e => setN1(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            type="number"
            value={n2}
            placeholder="n2"
            onChange={e => setN2(e.target.value)}
          />
          <select
            className="border p-2 rounded"
            value={op}
            onChange={e => setOp(e.target.value)}
          >
            {operations.map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-center mb-4 w-full">
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
            onClick={sendRequest}
          >
            Envoyer
          </button>
        </div>

  
        <h3 className="text-xl font-semibold mb-2">Résultats :</h3>
        <ul className="bg-gray-50 w-full p-4 rounded shadow-inner">
          {results.map((r: any, idx: number) => (
            <li key={idx} className="border-b py-2">
              {r.n1} {r.op} {r.n2} = {r.result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );  
}

export default App;
