import { useRive,useStateMachineInput  } from "@rive-app/react-canvas";
import animation from './quiz-character.riv'
import { useEffect } from "react";
export default function Rive({ stateMachine, artboard, height, width ,triggerState}) {
  const {rive, RiveComponent } = useRive({
    src: animation,
    stateMachines: stateMachine,
    autoplay: true,
    artboard: artboard,
  });
  const startq =useStateMachineInput(rive, stateMachine, "strat question");
  const fail =useStateMachineInput(rive, stateMachine, "false");
  const correct =useStateMachineInput(rive, stateMachine, "correct");
  useEffect(() => {
    if (triggerState === 'start') {
      startq.fire();
    }
    else if(triggerState === 'false'){
      fail.fire();
    }
    else if(triggerState === 'correct'){
      correct.fire();
    }
  }, triggerState);
  
  return (
    <div className=" " style={{ height: height, width: width ? width : "100%"  }}>
      <RiveComponent style={{ height: "100%" }} />
    </div>
  );
}
