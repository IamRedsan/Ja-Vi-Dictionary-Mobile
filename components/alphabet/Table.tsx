import React, { useState } from 'react';
import { View } from 'react-native';
import { Alphabet } from '@/constants/Alphabet';
import Char from './Char';
import Header from './Header';

interface TableProps {
  isDefaultHiragana: boolean;
}

const Table: React.FC<TableProps> = ({ isDefaultHiragana }) => {
  const [isHiragana, setIsHiragana] = useState<boolean>(isDefaultHiragana);
  return (
    <View className="flex-1 mx-[10px] rounded-t-[10px] border-[rgba(0,0,0,1)] border-[0.2px] mt-2">
      <Header setIsHiragana={setIsHiragana} />
      <View className="flex-1 bg-secondary-background gap-2 p-2 border-b-[0.1px]">
        {Alphabet.map((line, index1) => {
          return (
            <View key={index1} className="flex-row justify-between gap-2">
              {line.map((word, index2) => {
                return (
                  <Char
                    content={isHiragana ? word.hiragana : word.katakana}
                    romaji={word.romaji}
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
