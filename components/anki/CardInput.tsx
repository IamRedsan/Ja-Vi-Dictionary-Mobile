import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

interface CardInputProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const CardInput: React.FC<CardInputProps> = ({
  label,
  onChange,
  value,
  disabled,
}) => {
  const [v, setV] = useState<string>();
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleChange = (value: string) => {
    setV(value);
    if (onChange) onChange(value);
  };

  return (
    <View className='px-[16px] py-[10px] bg-primary-background'>
      <Text className='text-lg text-text'>{label}</Text>
      <TextInput
        className={`caret-primary text-text text-lg ${
          isFocus
            ? 'border-b-primary border-b-[2px]'
            : 'border-b-gray-400 border-b-[1px]'
        }`}
        multiline
        textAlignVertical='top'
        value={value ?? v}
        onChangeText={handleChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        editable={!disabled}
      />
    </View>
  );
};
export default CardInput;
