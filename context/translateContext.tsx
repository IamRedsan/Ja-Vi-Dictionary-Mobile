import { socket } from '@/utils/socket';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type TranslateStateType = {
  text: string;
  translatedText: string;
  status: 'standby' | 'waiting' | 'translating';
  model: 'javi' | 'vija';
  isConnected: boolean;
};

export type TranslateContextType = TranslateStateType & {
  toggleModel: () => void;
  translate: (text: string) => void;
  setText: (text: string) => void;
};

export const TranslateContext = createContext<TranslateContextType | null>(
  null
);

const TranslateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [text, setText] = useState('');
  const [translatedText, setTransaltedText] = useState('');
  const [model, setModel] = useState<'javi' | 'vija'>('javi');
  const [status, setStatus] = useState<'standby' | 'waiting' | 'translating'>(
    'standby'
  );
  const [isConnected, setIsConnected] = useState(false);

  const translate = (text: string) => {
    if (text.trim().length === 0) return;

    setStatus('waiting');
    setTransaltedText('');
    socket.emit('translate-request', { model, content: text });
  };

  const toggleModel = () => {
    setModel((prev) => (prev === 'javi' ? 'vija' : 'javi'));
    setText(translatedText);
    setTransaltedText(text);
  };

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onTranslate = (text: string) => {
      if (text === '[CLS]') {
        setStatus('translating');
      } else if (text === '[SEP]') {
        setStatus('standby');
      } else {
        setTransaltedText((prev) => {
          text = text.replace(/#/g, '');
          text = text.replace('_', ' ');
          return prev + text + ' ';
        });
      }
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('translate', onTranslate);

    socket.connect();

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('translate', onTranslate);

      socket.disconnect();
    };
  }, []);

  return (
    <TranslateContext.Provider
      value={{
        isConnected,
        model,
        setText,
        status,
        text,
        translatedText,
        toggleModel,
        translate,
      }}>
      {children}
    </TranslateContext.Provider>
  );
};

export const useTranslateContext = () => {
  return useContext(TranslateContext) as TranslateContextType;
};

export default TranslateProvider;
