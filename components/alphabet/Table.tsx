import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Alphabet } from '@/constants/Alphabet';
import Char from './Char';
import Header from './Header';
import { Colors } from '@/constants/Colors';

const Table: React.FC = () => {
  const [isHiragana, setIsHiragana] = useState<boolean>(true);
  return (
    <View className="flex-1 mx-[10px] mt-[8px] rounded-t-[10px] border-[rbga(0,0,0,1)] border-[0.2px]">
      <Header setIsHiragana={setIsHiragana} />
      <View className="bg-secondary-background gap-2 p-2">
        {Alphabet.map((line, index1) => {
          return (
            <View key={index1} className="flex-row justify-between gap-2">
              {line.map((word, index2) => {
                return (
                  <Char
                    content={isHiragana ? word.hiragana : word.katakana}
                    romaji={word.romaji}
                    link={word.mainLink}
                    subLink={word.subLink}
                    key={index2}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Table;
