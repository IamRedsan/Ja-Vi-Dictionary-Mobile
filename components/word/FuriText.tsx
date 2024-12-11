import React from 'react';
import { Text, View } from 'react-native';
import { useFuriPairs } from '../../hooks/furiganaHook';

interface FuriTextProps {
  word?: string;
  reading?: string;
  furi?: string;
  showFuri?: boolean;
  size?: 'small' | 'big';
}

export function FuriText({
  word = '',
  reading = '',
  furi = '',
  showFuri = true,
  size = 'small',
}: FuriTextProps) {
  const pairs = useFuriPairs(word, reading, furi);
  return (
    <View className='flex flex-row flex-wrap my-2'>
      {pairs.map(([furiText, text]: any, index: any) => (
        <View key={index} className='flex flex-col items-center justify-end'>
          {showFuri && (
            <Text
              className={`${
                size === 'small' ? 'text-sm' : 'text-base'
              } text-text-light opacity-90`}>
              {furiText}
            </Text>
          )}
          <Text
            className={`${size === 'small' ? 'text-lg' : 'text-xl'} text-text`}>
            {text}
          </Text>
        </View>
      ))}
    </View>
  );
}
