import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchQuestion = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/questions/${id}`);
      setQuestion(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:5000/api/answers/${id}`,
        { content: newAnswer },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setNewAnswer('');
      fetchQuestion(); // Refresh the question with new answer
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const vote = async (answerId, type) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/answers/${answerId}/${type}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      fetchQuestion(); // refresh the answers with updated votes
    } catch (err) {
      console.error(err);
    }
  };
  

  if (!question) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{question.title}</h1>
      <p className="text-gray-600">{question.body}</p>

      <h2 className="mt-6 text-xl font-semibold">Answers</h2>
      {question.answers.length > 0 ? (
        question.answers.map((ans) => (
          <div key={ans._id} className="border p-3 my-2 rounded bg-white">
           <p>{ans.content}</p>
<div className="flex items-center gap-3 mt-2">
  <button
    onClick={() => vote(ans._id, 'upvote')}
    className="px-2 py-1 bg-green-600 text-white rounded"
  >
    Upvote
  </button>
  <span className="text-sm">{ans.votes || 0} votes</span>
  <button
    onClick={() => vote(ans._id, 'downvote')}
    className="px-2 py-1 bg-red-600 text-white rounded"
  >
    Downvote
  </button>
</div>

            <span className="text-sm text-gray-500">
              by {ans.authorId?.username || 'Anonymous'}
            </span>
          </div>
        ))
      ) : (
        <p>No answers yet. Be the first to answer!</p>
      )}

      {/* Add Answer Form */}
      <form onSubmit={handleAnswerSubmit} className="mt-6">
        <textarea
          rows={4}
          className="w-full border p-2 rounded"
          placeholder="Write your answer here..."
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Submitting...' : 'Submit Answer'}
        </button>
      </form>
    </div>
  );
};

export default QuestionDetail;
