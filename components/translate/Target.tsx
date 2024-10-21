import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import TextArea from '../ui/TextArea';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { cssInterop } from 'nativewind';
import * as Clipboard from 'expo-clipboard';

cssInterop(FontAwesome6, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

interface TargetProps {
  title: string;
  text?: string;
  loading?: boolean;
}

const Target: React.FC<TargetProps> = ({ title, text, loading }) => {
  const copyToClipboard = async () => {
    if (text) await Clipboard.setStringAsync(text);
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
      <View className='flex-row justify-between'>
        <View />
        <TouchableOpacity disabled={loading} onPress={copyToClipboard}>
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
