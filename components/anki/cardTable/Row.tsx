import { forwardRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface RowProps extends TouchableOpacityProps {
  word: string;
  example: string;
  isOdd: boolean;
}

const Row = forwardRef<View, RowProps>(
  ({ example, isOdd, word, ...rest }, ref) => {
    return (
      <TouchableOpacity
        {...rest}
        className={`flex-row px-2 ${
          isOdd ? 'bg-primary-background' : 'bg-tertiary-background'
        }`}
        ref={ref}>
        <Text
          numberOfLines={1}
          className='flex-grow-[1] text-left text-text text-lg border-r-[0.5px] border-r-text px-2 py-2 flex-1'>
          {word}
        </Text>
        <Text
          numberOfLines={1}
          className='flex-grow-[2] text-left text-text text-lg  px-4 py-2 flex-1'>
          {example}
        </Text>
      </TouchableOpacity>
    );
  }
);

export default Row;
