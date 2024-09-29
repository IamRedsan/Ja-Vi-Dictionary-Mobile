import { View, Text } from 'react-native';
import TextInput from '../ui/TextInput';
import React from 'react';

type FormRowProps = {
  label: string;
  text: string;
  onChangeText: (value: string) => void;
  placeHolder?: string;
  errMsg?: string;
};

const FormRow: React.FC<FormRowProps> = ({
  label,
  text,
  onChangeText,
  placeHolder,
  errMsg,
}) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        placeholder={placeHolder}
        value={text}
        onChangeText={onChangeText}
      />
      <Text>{errMsg ? errMsg : ''}</Text>
    </View>
  );
};
export default FormRow;
