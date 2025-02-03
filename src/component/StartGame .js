import { useState } from 'react';
import options from '../asets/Icons';
import ss from '../asets/icons/172609_tv_icon.svg';

const StartGame = ({ onStartGame, setPlayerNames }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [playerName, setPlayerName] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePlayerNameChange = (event) => {
    const name = event.target.value;
    setPlayerNames(name);
    setPlayerName(name); // Update the player name in the App component
  };

  const handleStartGame = () => {
    if (selectedCategory && playerName) {
      onStartGame(selectedCategory);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && selectedCategory && playerName) {
      onStartGame(selectedCategory);
    }
  };

  return (
    <div className="flex justify-center items-center sm:w-full sm:h-screen sm:m-0 mx-3 my-10">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-3xl font-semibold text-text mb-4">Welcome to the Quiz Game</h1>
        <p className="text-gray-700 mb-4">Select a category:</p>
        <div className="relative inline-block w-full">
          <select
            className="block appearance-none w-full bg-white border border-gray-300 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            onChange={handleCategoryChange}
            value={selectedCategory}
            required
          >
            <option value="">Select a category</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                <div className="">
                  <img src={ss} alt="" className="h-10 w-10" />
                  <span>{option.label}</span>
                </div>
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <input
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2 m-auto flex justify-center my-4"
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={handlePlayerNameChange}
          onKeyDown={handleKeyDown}
          required
        />

        <button
          className="bg-primary-button text-secondary-button font-semibold py-2 px-4 rounded m-auto w-36 flex justify-center"
          onClick={handleStartGame}
          disabled={!selectedCategory || !playerName}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default StartGame;
