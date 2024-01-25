import React, { useState } from "react";
import VoicesList from "./voiceslist";
import Player from "./player";

const sampleText = `This is just a sample of someone talking. If you know what i wanna know, then you should be able to sing tell me why aint nothing but a heartache tell me why.`;

const sampleArray = [
    `<speak>Here are <say-as interpret-as="characters">SSML</say-as> samples. I can pause <break time="3s"/>. I can play a sound <audio src="https://www.example.com/MY_MP3_FILE.mp3">didn't get your MP3 audio file</audio>. I can speak in cardinals. Your number is <say-as interpret-as="cardinal">10</say-as>. Or I can speak in ordinals. You are <say-as interpret-as="ordinal">10</say-as> in line. Or I can even speak in digits. The digits for ten are <say-as interpret-as="characters">10</say-as>. I can also substitute phrases, like the <sub alias="World Wide Web Consortium">WET</sub>. Finally, I can speak a paragraph with two sentences. <p><s>This is sentence one.</s><s>This is sentence two.</s></p></speak>`,
    `Your lipstick stains on the front lobe of my left side brains, I knew I wouldn't forget you and so I went and let you blow my mind, your sweet moonbeam the smell of you in every single dream I dream, i knew when we collided you're the one I had decided who's one of my kind`,
    `Just in time i'm so glad you have a one track mind like me, you gave my life direction, a game show love connection we can't deny, i'm so obsessed, my heart is bound to beat right out of my untrimmed chest, i believe in you, like a virgin you're madonna and I'm always gonna wanna blow your mind`,
    `<speak>The <say-as interpret-as=\"characters\">SSML</say-as> standard <break time=\"1s\"/>is defined by the <sub alias=\"World Wide Web Consortium\">W3C</sub>.</speak>`,
    `Here are S S M L samples. I can pause [3 second pause]. I can play a sound [audio file plays]. I can speak in cardinals. Your number is ten. Or I can speak in ordinals. You are tenth in line. Or I can even speak in digits. The digits for ten are one oh. I can also substitute phrases, like the World Wide Web Consortium. Finally, I can speak a paragraph with two sentences. This is sentence one. This is sentence two.`
];

const sampleArray2 = [
    `<speak>Here are <say-as interpret-as="characters">SSML</say-as> samples. I can pause <break time="3s"/>. I can play a sound <audio src="https://www.example.com/MY_MP3_FILE.mp3">didn't get your MP3 audio file</audio>. I can speak in cardinals. Your number is <say-as interpret-as="cardinal">10</say-as>. Or I can speak in ordinals. You are <say-as interpret-as="ordinal">10</say-as> in line. Or I can even speak in digits. The digits for ten are <say-as interpret-as="characters">10</say-as>. I can also substitute phrases, like the <sub alias="World Wide Web Consortium">WET</sub>. Finally, I can speak a paragraph with two sentences. <p><s>This is sentence one.</s><s>This is sentence two.</s></p></speak>`,
];

const Page = () => {
    const [voices, setVoices] = useState(sampleArray2);
    const [selected, setSelected] = useState('');

    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%', 
            height: '100%', 
            paddingTop: 20, 
            paddingLeft: 20, 
        }}>
            <VoicesList voices={voices} voicesSetter={setVoices} selected={selected} play={setSelected}  />
            <Player voiceText={selected} />
        </div>
    )
}

export default Page;