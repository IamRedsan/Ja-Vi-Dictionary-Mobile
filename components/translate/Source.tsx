import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import TextArea from '../ui/TextArea';
import { cssInterop } from 'nativewind';

cssInterop(AntDesign, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

interface SourceProps {
  title: string;
  text?: string;
  onChangeText?: (text: string) => void;
  disabled?: boolean;
}

const Source: React.FC<SourceProps> = ({
  title,
  disabled,
  text,
  onChangeText,
}) => {
  return (
    <View className='p-4'>
      <View className='flex-row justify-between items-center'>
        <Text className='text-text text-lg'>{title}</Text>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            if (onChangeText) onChangeText('');
          }}>
          <AntDesign
            name='close'
            className={`${
              disabled ? 'text-gray-500' : 'text-text'
            } text-[24px]`}
          />
        </TouchableOpacity>
      </View>
      <TextArea
        value={text}
        onChangeText={onChangeText}
        editable={!disabled}
        className={`text-lg py-2 ${
          disabled ? 'text-gray-500' : 'text-text'
        } caret-primary min-h-[200px]`}
      />
    </View>
  );
};

export default Source;
