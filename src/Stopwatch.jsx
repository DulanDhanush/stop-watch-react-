import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    return {
      min: String(minutes).padStart(2, "0"),
      sec: String(seconds).padStart(2, "0"),
      ms: String(milliseconds).padStart(2, "0"),
    };
  }

  const time = formatTime();

  return (
    <div className="stopwatch-container">
      <div className="glass-panel">
        <div className="scanline"></div>
        <div className="display">
          <span className="time-unit">{time.min}</span>
          <span className="separator">:</span>
          <span className="time-unit">{time.sec}</span>
          <span className="separator">:</span>
          <span className="ms-unit">{time.ms}</span>
        </div>

        <div className="controls">
          <button onClick={start} className="btn start">
            START
          </button>
          <button onClick={stop} className="btn stop">
            STOP
          </button>
          <button onClick={reset} className="btn reset">
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
