import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    console.log('mode', mode);
    setMode(mode);
    setHistory(replace ? history : [...history, mode]);
  }

  function back() {
    if (history.length > 1) {
      setHistory(history.slice(0, -1))
      setMode(history[history.length - 2])
    } else {
      setMode(initial);
      setHistory(initial);
    }
  }

  return { mode, transition, back };
}