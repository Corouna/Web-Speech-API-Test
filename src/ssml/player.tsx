import React, { useState, useEffect } from 'react';
import usePlayer from "./../hooks/usePlayer";
import useVoices from "./../hooks/useVoices";
import useRate from "./../hooks/useRate";

interface VoicePlayerProps {
  voiceText: string
}

const Player: React.FC<VoicePlayerProps> = ({ voiceText }) => {
  const { speakText, currentUtterance, isPlaying, isPaused } = usePlayer({ speech: voiceText });
  const { voices, voice, handleVoiceChange } = useVoices();
  const { rate, handleRateChange } = useRate();

  const playHandler = () => {
      speakText(voice, rate);
  }

  const voiceHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleVoiceChange(event.target.value, isPlaying, isPaused, currentUtterance);
  }

  const rateHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    handleRateChange(evt.target.value, isPlaying, isPaused, currentUtterance);
  }

  return (
    <div id="voicePlayer" 
        style={{ 
            textAlign: 'center', 
            backgroundColor: '#FBFCFC',
            width: 800,
            height: 60,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center', 
            alignContent: 'center', 
            alignItems: 'center',
            borderRadius: 30,
            border: '0.5px solid #1B2631'
        }}
    >
      <div 
        style={{ 
          width: '33%',
          height: '100%',
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'center', 
          alignContent: 'center', 
          alignItems: 'center',
          borderRadius: 30,
        }}
      >
        <select 
          style={{ width: 200, height: 30, borderRadius: 5 }}
          value={voice ? voice.name : ''} 
          onChange={voiceHandler}
        >
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name} style={{ height: 25 }}>
              {voice.name}
            </option>
          ))}
        </select>
      </div>
      <div 
        style={{ 
          width: '33%',
          height: '100%',
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'center', 
          alignContent: 'center', 
          alignItems: 'center',
          borderRadius: 30,
        }}
      >
        <button
          style={{
            margin: '10px',
            padding: '10px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: 30
          }}
          onClick={playHandler}
        >
          {isPlaying && !isPaused ? 'Pause' : 'Play'}
        </button>
      </div>
      <div 
        style={{ 
          width: '33%',
          height: '100%',
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'center', 
          alignContent: 'center', 
          alignItems: 'center',
          textAlign: 'center',
          borderRadius: 30,
        }}
      >
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={rateHandler}
        />
        <span style={{ fontSize: 13, marginLeft: 10, lineHeight: 10 }}>{rate.toFixed(1)}x</span>
      </div>
    </div>
  );
};

export default Player;
