import { fetchQuizQuestions } from './component/Api';
import Game from './component/Game';
import Score from './component/Score';
import StartGame from './component/StartGame ';
import { useState, useEffect } from 'react';

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
    <div className="bg-background min-h-screen sm:flex">
      <div className="w-full sm:flex sm:felx-col ">
        {gameStarted ? (
          <Game onGoBack={handleGoBack} playerName={playerName} scoreset={setScores} questions={questions} />
        ) : (
          <StartGame
            onStartGame={startGame}
            selectedCategory={selectedCategory}
            setcat={setSelectedCategory}
            setPlayerNames={setPlayerName}
          />
        )}

          <div>
        <Score scores={scores} />
        </div>
      </div>
    </div>
  );
}

export default App;
