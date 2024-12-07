import { router } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';

interface RowProps {
  id: number;
  name: string;
  new: number;
  learning: number;
  review: number;
  active?: boolean;
}

const Row: React.FC<RowProps & TouchableOpacityProps> = ({
  id,
  name,
  new: newNumber = 0,
  learning = 0,
  review = 0,
  active,
  ...rest
}) => {
  const handleLongPressRow = () => {
    router.push({
      pathname: '/deck-modal',
      params: {
        deckId: id,
        deckName: name,
      },
    });
  };

  return (
    <TouchableOpacity
      onLongPress={handleLongPressRow}
      {...rest}
      className={`flex flex-row justify-between items-center px-4 py-1 rounded-[10px] ${
        active ? 'bg-anki-hightlight' : ''
      }`}>
      <Text
        numberOfLines={1}
        className={`flex-grow-[1] text-lg text-anki-text flex-1 ${
          active ? 'text-anki-text-hightlight' : ''
        }`}>
        {name}
      </Text>
      <Text className='w-[25%] text-lg text-[#93C5FD] text-right'>
        {newNumber}
      </Text>
      <Text className='w-[25%] text-lg text-[#F87171] text-right'>
        {learning}
      </Text>
      <Text className='w-[25%] text-lg text-[#22C55E] text-right'>
        {review}
      </Text>
    </TouchableOpacity>
  );
};
export default Row;
