import {
  View,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';

import { cssInterop } from 'nativewind';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { forwardRef } from 'react';

cssInterop(FontAwesome, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

type FontAwesomeName = keyof typeof FontAwesome.glyphMap;

interface RowProps extends TouchableOpacityProps {
  icon: FontAwesomeName;
  title: string;
}

const Row = forwardRef<TouchableOpacity, RowProps>(
  ({ icon, title, ...rest }, ref) => {
    return (
      <TouchableOpacity
        className='flex-row items-center py-3 px-4'
        ref={ref}
        {...rest}>
        <View className='bg-primary-foreground w-11 h-11 rounded-full flex justify-center items-center mr-4'>
          <FontAwesome name={icon} className='text-text text-[24px]' />
        </View>
        <View className='flex-grow'>
          <Text className='text-text text-[16px]'>{title}</Text>
        </View>
        <FontAwesome name='angle-right' className='text-text text-[26px]' />
      </TouchableOpacity>
    );
  }
);

export default Row;
