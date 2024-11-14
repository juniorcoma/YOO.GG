'use client';

import { useEffect, useState } from 'react';

interface GameDurationTimerProps {
  gameStartTime: number;
}

export default function GameDurationTimer({ gameStartTime }: GameDurationTimerProps) {
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    setTimer(calculateDurationTime(gameStartTime));

    let increaseTimer = setInterval(() => {
      setTimer(prev => (prev !== null ? prev + 1 : null));
    }, 1000);

    return () => {
      clearInterval(increaseTimer);
    };
  }, []);

  return (
    <span>
      {timer &&
        `${Math.floor(timer / 60) < 10 ? `0${Math.floor(timer / 60)}` : Math.floor(timer / 60)} : ${
          timer % 60 < 10 ? `0${timer % 60}` : timer % 60
        }`}
    </span>
  );
}

function calculateDurationTime(startTime: number) {
  const now = new Date().getTime();
  const durationMilli = now - startTime;

  return Math.floor(durationMilli / 1000);
}
