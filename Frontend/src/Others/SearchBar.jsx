import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDebounce } from 'use-debounce';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const [debouncedInput] = useDebounce(input, 500); // 500ms debounce
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedInput.trim()) {
        try {
          const res = await axios.get(`http://localhost:5000/api/search?q=${debouncedInput}`);
          setResults(res.data);
        } catch (err) {
          console.error('Search error:', err);
        }
      } else {
        setResults([]);
      }
    };

    fetchResults();
  }, [debouncedInput]);

  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      <input
        type="text"
        placeholder="Search questions..."
        className="w-full p-3 border rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <ul className="mt-4 space-y-2">
        {results.map((item, index) => (
          <li key={index} className="bg-white p-3 shadow rounded">
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
