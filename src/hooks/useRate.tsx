import React, { useState } from "react";

const useRate = () => {
    const [rate, setRate] = useState<number>(1);

    const handleRateChange = (value: string, isPlaying: boolean, isPaused: boolean, currentUtterance: SpeechSynthesisUtterance | null ) => {
        const newRate = parseFloat(value);
        setRate(newRate);

        // Update the rate dynamically if speech is in progress
        if (currentUtterance && isPlaying && !isPaused) {
            currentUtterance.rate = newRate;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(currentUtterance);
        }
    };

    return {
        rate,
        handleRateChange
    };
}

export default useRate;