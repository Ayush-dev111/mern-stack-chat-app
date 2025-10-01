import React from 'react'
import keyStroke1 from '../assets/Sounds/keystroke1.mp3';
import keyStroke2 from '../assets/Sounds/keystroke2.mp3';
import keyStroke3 from '../assets/Sounds/keystroke3.mp3';
import keyStroke4 from '../assets/Sounds/keystroke4.mp3';
const keyStrokeSounds = [
    new Audio(keyStroke1),
    new Audio(keyStroke2),
    new Audio(keyStroke3),
    new Audio(keyStroke4),
]

const useKeyBoardSound = () => {
  const playRandomKeyStrokeSound = () =>{
    const randomSound = keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];
    randomSound.currentTime = 0;
    randomSound.play().catch(error => console.log("Audio play failed:", error));
  };

  return { playRandomKeyStrokeSound };
}

export default useKeyBoardSound;