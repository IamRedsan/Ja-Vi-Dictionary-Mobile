import Header from '@/components/translate/Header';
import ImagePickerModal from '@/components/translate/ImagePickerModal';
import Source from '@/components/translate/Source';
import Target from '@/components/translate/Target';
import Button from '@/components/ui/Button';
import { socket } from '@/utils/socket';
import { cssInterop } from 'nativewind';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

cssInterop(SafeAreaView, {
  className: {
    target: 'style',
  },
});

const Translate = () => {
  const [st, setSt] = useState<'javi' | 'vija'>('javi');
  const stRef = useRef(st);
  const [isConnected, setIsConnected] = useState(false);
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [status, setStatus] = useState<'standby' | 'waiting' | 'translating'>(
    'standby'
  );

  const disabled = !isConnected || status !== 'standby';
  const loading = status !== 'standby';

  useEffect(() => {
    stRef.current = st;
  }, [st]);

  const handleTranslatePressed = () => {
    if (source.trim().length === 0) return;

    setStatus('waiting');
    setTarget('');
    socket.emit('translate-request', { model: st, content: source });
  };

  const handleSwitchModel = () => {
    setSt((value) => {
      return value === 'javi' ? 'vija' : 'javi';
    });
    const s = source;
    setSource(target);
    setTarget(s);
  };

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onTranslate = (text: string) => {
      if (text === sourceTargetPair[stRef.current].startToken) {
        setStatus('translating');
      } else if (text === sourceTargetPair[stRef.current].endToken) {
        setStatus('standby');
      } else {
        setTarget((preText) => {
          text = text.replace(/#/g, '');
          text = text.replace(/@/g, '');
          if (stRef.current === 'javi') {
            text = text.replace('_', ' ');
            if (preText.length === 0)
              text = text.charAt(0).toUpperCase() + text.slice(1);
            else if (preText.charAt(preText.length - 1).match(/^[.!?]/))
              text = ' ' + text.charAt(0).toUpperCase() + text.slice(1);
            else if (!text.match(/^[.,:!?]/)) text = ' ' + text;
          }
          return preText + text;
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
    <View className='relative flex-1'>
      <SafeAreaView className='bg-primary-background' />
      <ScrollView className='bg-primary-background flex-1'>
        <Header
          source={sourceTargetPair[st].source}
          target={sourceTargetPair[st].target}
          onPress={handleSwitchModel}
          disabled={disabled}
        />
        <Source
          title={sourceTargetPair[st].source}
          text={source}
          onChangeText={(text) => setSource(text)}
          disabled={disabled}
        />
        <Button
          className='mx-4'
          disabled={disabled}
          onPress={handleTranslatePressed}>
          Dịch
        </Button>
        <Target
          title={sourceTargetPair[st].target}
          text={target}
          loading={loading}
        />
      </ScrollView>
      <ImagePickerModal />
    </View>
  );
};

export default Translate;

const sourceTargetPair = {
  javi: {
    source: 'Tiếng Nhật',
    target: 'Tiếng Việt',
    startToken: '</s>',
    endToken: '<unk>',
  },
  vija: {
    source: 'Tiếng Việt',
    target: 'Tiếng Nhật',
    startToken: '[CLS]',
    endToken: '[SEP]',
  },
};
