import { useRef, useEffect } from 'react';

export const useQuizAudio = () => {
  const correctSoundRef = useRef<HTMLAudioElement | null>(null);
  const wrongSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    correctSoundRef.current = new Audio('/sounds/correct.mp3');
    wrongSoundRef.current = new Audio('/sounds/wrong.mp3');
    
    // Preload audio
    correctSoundRef.current.load();
    wrongSoundRef.current.load();
  }, []);

  const playCorrectSound = () => {
    if (correctSoundRef.current) {
      correctSoundRef.current.currentTime = 0;
      correctSoundRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  const playWrongSound = () => {
    if (wrongSoundRef.current) {
      wrongSoundRef.current.currentTime = 0;
      wrongSoundRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  return { playCorrectSound, playWrongSound };
};
