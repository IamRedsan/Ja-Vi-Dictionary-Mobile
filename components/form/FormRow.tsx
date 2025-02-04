import { View, Text } from 'react-native';
import TextInput from '../ui/TextInput';
import React from 'react';

interface FormRowProps {
  label: string;
  text: string;
  onChangeText?: (value: string) => void;
  placeHolder?: string;
  errMsg?: string;
  className?: string;
  secureTextEntry?: boolean;
  editable?: boolean;
}

const FormRow: React.FC<FormRowProps> = ({
  label,
  text,
  onChangeText,
  placeHolder,
  errMsg,
  className,
  secureTextEntry,
  editable,
}) => {
  return (
    <View className={className}>
      <Text className='text-form-label capitalize'>{label}</Text>
      <TextInput
        placeholder={placeHolder}
        value={text}
        onChangeText={onChangeText}
        className='my-2'
        secureTextEntry={secureTextEntry}
        editable={editable}
      />
      <Text className='text-[#EE4B2B] capitalize'>{errMsg ? errMsg : ''}</Text>
    </View>
  );
};
export default FormRow;
