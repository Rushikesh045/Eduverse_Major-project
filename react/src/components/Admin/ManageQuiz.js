import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchQuizzes, createQuiz, updateQuiz, deleteQuiz } from '../../services/quizService';

const AdminQuizManager = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [newQuiz, setNewQuiz] = useState({ title: '', courseId: '' });
  const [error, setError] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const response = await fetchQuizzes(token);
        setQuizzes(response.data);
      } catch (error) {
        console.error('Failed to fetch quizzes', error);
        setError('Failed to load quizzes.');
      }
    };
    loadQuizzes();
  }, [token]);

  const handleCreateQuiz = async () => {
    try {
      const response = await createQuiz(newQuiz, token);
      setQuizzes([...quizzes, response.data]);
      setNewQuiz({ title: '', courseId: '' });
    } catch (error) {
      console.error('Failed to create quiz', error);
      setError('Failed to create quiz.');
    }
  };

  const handleUpdateQuiz = async (quizId, updatedQuiz) => {
    try {
      await updateQuiz(quizId, updatedQuiz, token);
      setQuizzes(
        quizzes.map((quiz) =>
          quiz.quizId === quizId ? { ...quiz, ...updatedQuiz } : quiz
        )
      );
    } catch (error) {
      console.error('Failed to update quiz', error);
      setError('Failed to update quiz.');
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      await deleteQuiz(quizId, token);
      setQuizzes(quizzes.filter((quiz) => quiz.quizId !== quizId));
    } catch (error) {
      console.error('Failed to delete quiz', error);
      setError('Failed to delete quiz.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Manage Quizzes</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-6">
        <input
          type="text"
          value={newQuiz.title}
          onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
          placeholder="Quiz Title"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={newQuiz.courseId}
          onChange={(e) => setNewQuiz({ ...newQuiz, courseId: e.target.value })}
          placeholder="Course ID"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleCreateQuiz}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Quiz
        </button>
      </div>

      {quizzes.length > 0 ? (
        <ul className="space-y-4">
          {quizzes.map((quiz) => (
            <li key={quiz.quizId} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{quiz.title}</h3>
                  <p className="text-gray-500">Course ID: {quiz.courseId}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleUpdateQuiz(quiz.quizId, { title: prompt('Enter new title', quiz.title) })}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteQuiz(quiz.quizId)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No quizzes available.</p>
      )}
    </div>
  );
};

export default AdminQuizManager;
