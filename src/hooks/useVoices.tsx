import React, { useEffect, useState } from "react";

interface Voice {
    name: string;
    lang: string;
}

const useVoices = () => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

    const handleVoiceChange = (value: string, isPlaying: boolean, isPaused: boolean, currentUtterance: SpeechSynthesisUtterance | null) => {
        const selectedVoice = voices.find((voice) => voice.name === value);
        setVoice(selectedVoice || null);

        // Update the rate dynamically if speech is in progress
        if (currentUtterance && isPlaying && !isPaused) {
            currentUtterance.voice = selectedVoice || null;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(currentUtterance);
        }
    };

    useEffect(() => {
        const fetchVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
        };

        // Update the voices when the voices change
        const voicesChanged = () => {
            fetchVoices();
        };
    
        // Fetch the available voices when the component mounts
        fetchVoices();
    
        // Add event listener for voiceschanged
        window.speechSynthesis.addEventListener('voiceschanged', voicesChanged);

        // Clean up the event listener when the component unmounts
        return () => window.speechSynthesis.removeEventListener('voiceschanged', voicesChanged);
    }, []);

    return {
        voices,
        voice,
        handleVoiceChange
    };
}

export default useVoices;