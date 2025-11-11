// Type definitions for A-Frame in React
declare namespace JSX {
  interface IntrinsicElements {
    'a-scene': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      embedded?: string;
      'device-orientation-permission-ui'?: string;
      'vr-mode-ui'?: string;
      renderer?: string;
    };
    'a-assets': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      timeout?: string;
    };
    'a-videosphere': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      rotation?: string;
    };
    'a-entity': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      camera?: string;
      'look-controls'?: string;
      'wasd-controls'?: string;
    };
  }
}
