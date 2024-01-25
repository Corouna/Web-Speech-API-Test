import React, { useState, useEffect} from "react";

interface PlayerProps {
  speech: string;
};

const usePlayer = ({ speech } : PlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const speakText = (voice: SpeechSynthesisVoice | null, rate: number) => {
    const voices = window.speechSynthesis.getVoices();

    if (isPlaying && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else {
      if (currentUtterance) {
        if (isPaused){
          window.speechSynthesis.resume();
          setIsPaused(false);
        } else {
          currentUtterance.voice = voice || null;
          currentUtterance.rate = rate;
          window.speechSynthesis.speak(currentUtterance);
          setIsPlaying(true);
        }

        currentUtterance.onend = (evt) => {
          setIsPlaying(false); // set play to false
          setIsPaused(false); // set pause to false
        }
      }
    }
  };

  useEffect(() => {
    setIsPlaying(false);
    setIsPaused(false);
    const voicePlayer = window.speechSynthesis;
    const utteranceObj = new SpeechSynthesisUtterance(speech);
    utteranceObj.onend = () => setIsPlaying(false);

    setCurrentUtterance(utteranceObj);

    const cleanup = () => voicePlayer.cancel();

    return cleanup;
  }, [speech]);

  return {
    speakText,
    currentUtterance,
    isPlaying,
    isPaused
  };
}

export default usePlayer;