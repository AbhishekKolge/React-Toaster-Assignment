import { createContext, useState } from 'react';

const TimerContext = createContext({
  timer: 7,
  setTimerHandler: () => {},
});

export const TimerContextProvider = (props) => {
  const [timer, setTimer] = useState(7);
  const setTimerHandler = (value) => {
    setTimer(value);
  };
  return (
    <TimerContext.Provider value={{ timer, setTimerHandler }}>
      {props.children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
