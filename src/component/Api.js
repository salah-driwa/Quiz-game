import axios from 'axios';

export const fetchQuizQuestions = async (amount, category, difficulty, type) => {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    return [];
  }
};
