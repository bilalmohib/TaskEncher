declare module 'react-speech-kit' {
    export function useSpeechSynthesis(): {
      speak: (options: { text: string }) => void;
      speaking: boolean;
    };
  
    // Add other exports if needed
  }
  