import { fetchQuizQuestions } from './component/Api';
import Game from './component/Game';
import Score from './component/Score';
import StartGame from './component/StartGame ';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Importing Framer Motion

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [questions, setQuestions] = useState();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [scores, setScores] = useState(() => {
    const storedScores = localStorage.getItem('scores');
    return storedScores ? JSON.parse(storedScores) : [];
  });

  useEffect(() => {
    // Save scores to localStorage whenever the scores state changes
    localStorage.setItem('scores', JSON.stringify(scores));
    console.log('New data stored:', scores);
  }, [scores]);

  const startGame = async (selectedCategory) => {
    setGameStarted(true);

    const fetchedQuestions = await fetchQuizQuestions(10, parseInt(selectedCategory, 10), 'medium', 'multiple');
    setQuestions(fetchedQuestions);
  };

  const handleGoBack = () => {
    setGameStarted(false);
  };

  return (
    <div className=" bg-background min-h-screen sm:flex">
      <div className="w-full flex  sm:flex sm:flex-row">
        {/* Game Component with Framer Motion Animation */}
        {gameStarted ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className=' w-10/12'
          >
            <Game onGoBack={handleGoBack} playerName={playerName} scoreset={setScores} questions={questions} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
              className=' w-10/12'
          >
            <StartGame
              onStartGame={startGame}
              selectedCategory={selectedCategory}
              setcat={setSelectedCategory}
              setPlayerNames={setPlayerName}
            />
          </motion.div>
        )}

        {/* Score Section with Framer Motion */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Score scores={scores} />
        </motion.div>
      </div>
    </div>
  );
}

export default App;
