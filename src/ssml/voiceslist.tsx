import React, { useEffect, useState } from "react";
import { postData, CustomBody, CustomHeaders } from "./../api/fetch";
import { ssmlToTextParser } from "./../util/parser";

interface VoicesListProps {
    voices: string[];
    voicesSetter: (voice: string[]) => void;
    selected: string;
    play: (voice: string) => void;
}

const params: { [key:string]: any[] } = {
    'test1': [ 'http://localhost:8888/hello-world', { 'Content-Type': 'application/json' }, null ],
    'test2': [ 'http://localhost:8888/advanced', { 'Content-Type': 'application/json' }, { 'intent': 'WELCOME_INTENT' }],
    'test3': [ 'http://localhost:8888/advanced', { 'Content-Type': 'application/json' }, { 'intent': 'WEATHER' }],
};

const VoicesList: React.FC<VoicesListProps> = ({ voices, voicesSetter, selected, play }) => {
    const [isFetching, setIsFetching] = useState(false);
    const [testArray, setTestArray] = useState(['test1', 'test2', 'test3']);
    const [buttonDisable, setButtonDisable] = useState(false);

    const loadMoreHandler = () => {
        setIsFetching(true);
        setTimeout(async () => {
            
            if (!testArray.length){ 
                voicesSetter([...voices, 'No more content to load.']);
                setIsFetching(false);
                setButtonDisable(true);
                return;
            }

            const arraySet = params[testArray[0]];
            
            try {
                const data = await postData(...arraySet);
          
                if (data) {
                  voicesSetter([...voices, ssmlToTextParser(data.ssml)]);
                }
              } catch (error) {
                console.error('Error during post request:', error);
              } finally {
                testArray.shift();
                setTestArray(testArray);
                setIsFetching(false);
            }
        }, 1000);
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            backgroundColor: 'rgba(59,130,246,.5)',
            marginBottom: 20,
            borderRadius: 20,
            width: '80%'
        }}>
            {
                voices.map((voice, idx) => (
                    <div
                        key={`voicelist-${idx}`} 
                        style={{
                            display: 'flex',
                            width: '97%',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 10,
                            backgroundColor: voice === selected ? "skyblue" : '#FFFFFF' ,
                            marginBottom: 10,
                            borderRadius: 20,
                            cursor: 'pointer'
                        }}
                        onClick={() => play(voice)}
                    >
                    { voice }
                    </div>
                ))
            }
            {
                isFetching &&
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    padding: 10,
                    backgroundColor: '#FFFFFF' ,
                    marginTop: 10,
                    marginBottom: 10,
                    borderRadius: 10,
                    height: 20
                }}>
                    Please wait...
                </div>
            }
            <div style={{ marginTop: 20 }}>
                <button
                    style={{
                        margin: '10px',
                        padding: '10px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        borderRadius: 30
                    }}
                    onClick={loadMoreHandler}
                    disabled={buttonDisable}
                >
                    { isFetching ? 'Fetching..' : 'Load more'}
                </button>
            </div>
        </div>
    );
}

export default VoicesList