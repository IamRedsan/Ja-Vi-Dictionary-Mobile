import React from 'react';
import { View, Text } from 'react-native';

interface WordLinkItemProp {
  _id: string;
  text: string;
  hiragana: string;
  meaning: string;
}

const WordLinkItem: React.FC<WordLinkItemProp> = ({
  _id,
  hiragana,
  meaning,
  text,
}) => {
  return (
    <View>
      <Text>WordLinkItem </Text>
    </View>
  );
};
export default WordLinkItem;
