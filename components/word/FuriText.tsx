import React from 'react';
import { Text, View } from 'react-native';
import { useFuriPairs } from '../../hooks/furiganaHook';

interface FuriTextProps {
  word?: string;
  reading?: string;
  furi?: string;
  showFuri?: boolean;
}

export function FuriText({
  word = '',
  reading = '',
  furi = '',
  showFuri = true,
}: FuriTextProps) {
  const pairs = useFuriPairs(word, reading, furi);

  return (
    <View className="flex flex-row flex-wrap my-2">
      {pairs.map(([furiText, text]: any, index: any) => (
        <View key={index} className="flex flex-col items-center justify-end">
          {showFuri && (
            <Text className="text-sm text-text-light opacity-90">
              {furiText}
            </Text>
          )}
          <Text className="text-lg text-text">{text}</Text>
        </View>
      ))}
    </View>
  );
}
