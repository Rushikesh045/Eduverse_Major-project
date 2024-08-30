import axios from 'axios';

const API_URL = 'https://your-api-url/api/quizs'; // Replace with your actual API endpoint

export const fetchQuizzes = async (token) => {
  return await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createQuiz = async (quiz, token) => {
  return await axios.post(API_URL, quiz, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateQuiz = async (quizId, updatedQuiz, token) => {
  return await axios.put(`${API_URL}/${quizId}`, updatedQuiz, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteQuiz = async (quizId, token) => {
  return await axios.delete(`${API_URL}/${quizId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
