import { router } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';

interface RowProps {
  _id: string;
  name: string;
  new: number;
  learning: number;
  review: number;
  active?: boolean;
}

const Row: React.FC<RowProps & TouchableOpacityProps> = ({
  _id,
  name,
  new: newNumber,
  learning,
  review,
  active,
  ...rest
}) => {
  const handleLongPressRow = () => {
    router.push({
      pathname: '/deck-modal',
      params: {
        deckId: _id,
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
