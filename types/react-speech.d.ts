declare module 'react-speech' {
    import { Component } from 'react';
  
    export interface SpeechProps {
      text: string;
      lang?: string;
      voiceURI?: string;
      volume?: number;
      rate?: number;
      pitch?: number;
      onEnd?: () => void;
      onError?: (error: Event) => void;
      onStart?: () => void;
    }
  
    export class Speech extends Component<SpeechProps> {}
  
    export interface SpeechRecognitionProps {
      onResult?: (event: SpeechRecognitionEvent) => void;
      onError?: (event: Event) => void;
      continuous?: boolean;
      interimResults?: boolean;
      maxAlternatives?: number;
      lang?: string;
      grammars?: SpeechGrammarList;
    }
  
    export class SpeechRecognition extends Component<SpeechRecognitionProps> {}
  }
  