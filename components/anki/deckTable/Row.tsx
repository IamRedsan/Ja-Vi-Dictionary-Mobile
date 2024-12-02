import React from 'react';
import {
  View,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';

interface RowProps {
  name: string;
  new: number;
  learning: number;
  review: number;
  active?: boolean;
}

const Row: React.FC<RowProps & TouchableOpacityProps> = ({
  name,
  new: newNumber,
  learning,
  review,
  active,
  ...rest
}) => {
  return (
    <TouchableOpacity
      {...rest}
      className={`flex flex-row justify-between items-center px-4 py-1 rounded-[10px] ${
        active ? 'bg-anki-hightlight' : ''
      }`}>
      <Text
        className={`flex-grow-[1] text-lg text-anki-text ${
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
