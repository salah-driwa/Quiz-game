import React from 'react';
import { motion } from 'framer-motion';
const Score = ({scores}) => {
  // Commented out the state and useEffect for fetching scores

  // Local JSON data for scores
  
  return (
    <div className=' bg-secondary-button rounded shadow-md sm:p-8   mx-3 sm:h-[300px]   sm:m-2  p-2  sm:w-44  m-auto  '>
      <h2 className=' text-center pb-5'>Your Highest Scores</h2>
      <ul>
      {scores
  .sort((a, b) => b.score - a.score) // Sort scores in descending order
  .slice(0, 5) // Limit to top 5 scores
  .map((score, index) => (
    <motion.li
      whileHover={{ scale: 1.06 }}
      key={index}
      className="flex justify-between bg-slate-100 rounded-md my-2 p-1"
    >
      <span>{score.player}</span>
      <span>
        {score.score}
        {index < 5 && (
          <motion.div
            className="inline-block px-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <svg
              id="Layer_1"
              data-name="Layer 1"
              height="12px"
              fill="#ffd401"
              viewBox="0 0 122.88 117.1"
            >
              <path d="M64.42,2,80.13,38.7,120,42.26a3.2,3.2,0,0,1,1.82,5.62h0L91.64,74.18l8.9,39A3.19,3.19,0,0,1,98.12,117a3.27,3.27,0,0,1-2.46-.46L61.41,96.1,27.07,116.64a3.18,3.18,0,0,1-4.38-1.09,3.14,3.14,0,0,1-.37-2.38h0l8.91-39L1.09,47.88a3.24,3.24,0,0,1-.32-4.52,3.32,3.32,0,0,1,2.29-1l39.72-3.56L58.49,2a3.24,3.24,0,0,1,5.93,0Z" />
            </svg>
          </motion.div>
        )}
      </span>
    </motion.li>
  ))}

      </ul>
    </div>
  );
};

export default Score;
