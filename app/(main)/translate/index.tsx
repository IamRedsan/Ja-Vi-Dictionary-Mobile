import Header from '@/components/translate/Header';
import ImagePickerModal from '@/components/translate/ImagePickerModal';
import Source from '@/components/translate/Source';
import Target from '@/components/translate/Target';
import Button from '@/components/ui/Button';
import { useTranslateContext } from '@/context/translateContext';
import { cssInterop } from 'nativewind';
import React, { useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

cssInterop(SafeAreaView, {
  className: {
    target: 'style',
  },
});

const Translate = () => {
  const {
    isConnected,
    model,
    text,
    translatedText,
    status,
    translate,
    toggleModel,
    setText,
  } = useTranslateContext();
  const disabled = !isConnected || status !== 'standby';
  const loading = status !== 'standby';
  const scrollViewRef = useRef<any>();

  return (
    <View className='relative flex-1 pb-[70px] bg-primary-background'>
      <SafeAreaView className='bg-primary-background' />
      <ScrollView
        className='bg-primary-background flex-1'
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }>
        <Header
          source={sourceTargetPair[model].source}
          target={sourceTargetPair[model].target}
          onPress={toggleModel}
          disabled={disabled}
        />
        <Source
          title={sourceTargetPair[model].source}
          text={text}
          onChangeText={(text) => setText(text)}
          disabled={disabled}
          language={sourceTargetPair[model].sourceLanguageCode}
        />
        <Button className='mx-4' disabled={disabled} onPress={translate}>
          Dịch
        </Button>
        <Target
          title={sourceTargetPair[model].target}
          text={translatedText}
          loading={loading}
          language={sourceTargetPair[model].targetLanguageCode}
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
    sourceLanguageCode: 'ja-JP' as 'ja-JP' | 'vi-VN',
    targetLanguageCode: 'vi-VN' as 'ja-JP' | 'vi-VN',
  },
  vija: {
    source: 'Tiếng Việt',
    target: 'Tiếng Nhật',
    sourceLanguageCode: 'vi-VN' as 'ja-JP' | 'vi-VN',
    targetLanguageCode: 'ja-JP' as 'ja-JP' | 'vi-VN',
  },
};
