import React,{useEffect,FC} from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

interface TextToSpeechProps {
  text: string;
}

const TextToSpeech: FC<TextToSpeechProps> = ({ text }) => {
  const { speak, speaking } = useSpeechSynthesis();

  useEffect(() => {
    // if (!speaking) {
      speak({ text });
    // }
  }, [speak, speaking, text]);

  return (
    <div>
      {speaking ? 'Speaking...' : 'Ready'}
    </div>
  );
};

export default TextToSpeech;
