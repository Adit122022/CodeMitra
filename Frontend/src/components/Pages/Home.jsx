import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/questions')
      .then(res => setQuestions(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Questions</h1>
        <Link
          to="/ask"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ask Question
        </Link>
      </div>

      <div className="space-y-4">
        {questions.map((q) => (
          <Link
            to={`/questions/${q._id}`}
            key={q._id}
            className="block p-4 bg-white shadow rounded hover:bg-gray-50"
          >
            <h3 className="text-lg font-semibold">{q.title}</h3>
            <p className="text-sm text-gray-500">{q.body}...</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
