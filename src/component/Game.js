import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import animation from './quiz-character.riv'
import { useRive,useStateMachineInput  } from "@rive-app/react-canvas";
const Game = ({ playerName, onGoBack, questions,scoreset }) => { 
    const stateMachines ="State Machine 1"
    const {rive, RiveComponent } = useRive({
        src: animation,
        stateMachines: stateMachines,
        autoplay: true,
        artboard: "New Artboard",
      });
      const startq =useStateMachineInput(rive,stateMachines, "strat question");
      const fail =useStateMachineInput(rive, stateMachines, "false");
      const correct =useStateMachineInput(rive,stateMachines, "correct");
      const damg= useStateMachineInput(rive,stateMachines, "takedmg");
      
      const start = () => {
        if (startq) {
          startq.fire();
        }
      };

      const takedamg = () => {
        if (damg) {
          damg.fire();
        }
      };


      const fails = () => {
        if (fail) {
            fail.fire();
        }
      };
      const corrects = () => {
        if (correct) {
            correct.fire();
        }
      };

      setTimeout(() => {
        start()
      }, 1500);


  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [timer, setTimer] = useState(17);
  const [life ,setlife] =useState(3);
  const [options, setOptions] = useState([]);

  const shuffleOptions = () => {
    const currentQuestion = questions[questionNumber];
    const options = [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ];
  
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
  
    return options;
  };








  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 10);
      corrects();
    } else {
      fails();
      takedamg();
      setlife(life-1);
    }

    // Move to the next question after a delay
    setTimeout(() => {
      setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
      setOptions(shuffleOptions());
      setTimer(17); // Reset the timer for the next question
    }, 500);
  };


  useEffect(() => {
    if (questions && questions.length > 0) {
      setOptions(shuffleOptions()); // Shuffle options for the initial question
    }
  }, [questions]);


  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
  
    if(life<=0){
      scoreset(prevScores => [
        ...prevScores,
        { player: playerName, score: score }
      ])
      onGoBack()}
    

    if (timer === 0) {
      clearInterval(countdown);
      handleAnswer(false); // Timer ran out, handle as incorrect answer
    }
  
    return () => {
      clearInterval(countdown);
    };
  }, [questionNumber, timer]);
  


  if (!questions) {
    return <div>No questions available</div>;
  }



  return (
    <div className="flex justify-center items-center h-full w-full ">
      <div className="bg-white sm:p-8 rounded shadow-md h-full text-center w-full bg-red sm:m-2" >
       <div className=" absolute -left-8 sm:top-6  w-10 -top-12 z-50">
   <motion.button  animate={{scale:0.3,color:'white'}}
      whileHover={{scale:0.4 }}
      className="bg-primary-button text-secondary-button font-semibold p-8 flex   justify-start rounded-full  "
      onClick={onGoBack}
    >
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ width: '120px', height: '110px' }}>
  <g>
    <path className="st0" fill="white" d="M22.22,40.49L62.3,80.98V60.81c25.35-5.25,45.37,0.54,60.58,19.82c-2.64-39.65-29.73-58.78-60.58-60.05V0 L22.22,40.49L22.22,40.49z M0,40.49l40.09,40.49V68.04L12.81,40.49l27.28-27.55V0L0,40.49L0,40.49z"/>
  </g>
</svg>

   </motion.button>
   </div>
    
<section className=" bg-slate-100  drop-shadow-2xl  rounded-3xl  sm:w-10/12 m-auto p-5 z-10  pt-14 sm:pt-0">
        <h1 className="text-3xl font-semibold text-text text-center mb-4">
          Question {questionNumber + 1}
        </h1>
        <p className="text-gray-700 mb-4">{questions[questionNumber].question}</p>
        {/* Options */}
        <div className="sm:flex sm:flex-row justify-center mb-8">
          {/* Render the shuffled options */}
          {options.map((option, index) => (
            <motion.button
              key={index}
              className="bg-primary-button hover:bg-blue-500 sm:w-36 text-secondary-button font-semibold m-3 py-2 px-4 rounded mb-2"
              whileHover={{scale:1.05, y:-10}}
              onTap={() => handleAnswer(option === questions[questionNumber].correct_answer) }
          whileTap={option === questions[questionNumber].correct_answer ? {background:'green' , scale:[1.1,1.05]} :  {background:'red' ,x:[10,0,-10,10,0,-10  ] }}
            >
              {option}
            </motion.button>
          ))}
          
        </div>
        {/* Score */}
        <p className="text-gray-700 text-xl">playerName: {playerName}</p>
        <p className="text-gray-700">Score: {score}</p>
        <div
  className="  text-2xl font-semibold"
  style={{
    color: timer <= 5 ? "red" : timer <= 10 ? "orange" : "green" 
  }}
>
  Timer: {timer}
</div>

        <motion.div animate={{scale:1}} className="flex justify-center  w-full"><RiveComponent
      style={{ height: "400px" ,width:'600px'   }}
    /></motion.div>
        </section>
<div className="  ">
    


        {/* Come Back button */}
        
     

      </div>
    </div></div>
  );
};

export default Game;
