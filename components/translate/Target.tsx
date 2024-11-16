import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import TextArea from '../ui/TextArea';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { cssInterop } from 'nativewind';
import * as Clipboard from 'expo-clipboard';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Speech from 'expo-speech';

cssInterop(FontAwesome6, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

interface TargetProps {
  title: string;
  text?: string;
  language: 'ja-JP' | 'vi-VN';
  loading?: boolean;
}

const Target: React.FC<TargetProps> = ({ title, text, loading, language }) => {
  const handleCopyToClipboard = async () => {
    if (text) await Clipboard.setStringAsync(text);
  };

  const handleSpeak = () => {
    if (!text || text.length === 0) {
      return;
    }
    Speech.stop();
    Speech.speak(text, { language });
  };

  return (
    <View className='bg-primary m-4 p-4 rounded-lg'>
      <View className='flex-row justify-between items-center'>
        <Text className='text-white text-lg'>{title}</Text>
        {loading ? <ActivityIndicator color='white' /> : <View />}
      </View>
      <TextArea
        className='text-lg py-2 text-white min-h-[160px]'
        value={text}
        editable={false}
      />
      <View className='flex-row justify-end gap-4'>
        <TouchableOpacity
          className='p-1'
          disabled={loading}
          onPress={handleSpeak}>
          <FontAwesome
            name='volume-up'
            className={`${
              loading ? 'text-gray-500' : 'text-white'
            } text-[20px]`}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className='p-1'
          disabled={loading}
          onPress={handleCopyToClipboard}>
          <FontAwesome6
            name='copy'
            className={`text-[20px] ${
              loading ? 'text-gray-500' : 'text-white'
            }`}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Target;
