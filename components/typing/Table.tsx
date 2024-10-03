import React from 'react';
import { Text, View } from 'react-native';

interface TableProps {
  titlte: string;
  chars: {
    content?: string;
    romaji?: string;
  }[][];
}

const Table: React.FC<TableProps> = ({ titlte, chars }) => {
  return (
    <View className="bg-secondary-background flex-1 mx-[10px] my-[8px] rounded-t-[10px] border-[rgba(0,0,0,1)] border-l-[0.2px] border-t-[0.2px]">
      <View className="w-full bg-primary p-[8px] rounded-t-[10px] border-r-[0.2px]">
        <Text className="text-text-button text-base">{titlte}</Text>
      </View>
      <View>
        {chars.map((line, index1) => {
          return (
            <View
              key={index1}
              className="flex-row justify-between border-b-[0.2px]"
            >
              {line.map((char, index2) => {
                return (
                  <View key={index2} className="flex-1 border-r-[0.2px] py-1">
                    <View className="items-center ">
                      <Text className="text-text text-2xl">{char.content}</Text>
                      <Text className="text-text mt-1">{char.romaji}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}
        {/* {Alphabet.map((line, index1) => {
    return (
      <View key={index1} className="flex-row justify-between gap-2">
      {line.map((word, index2) => {
        return (
          <Char
          content={iscontent ? word.content : word.katakana}
          romaji={word.romaji}
          key={index2}
          />
          );
          })}
          </View>
          );
          })} */}
      </View>
    </View>
  );
};

export default Table;
