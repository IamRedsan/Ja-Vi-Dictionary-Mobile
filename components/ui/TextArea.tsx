import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface TextAreaProps extends TextInputProps {}

const TextArea: React.FC<TextAreaProps> = ({ ...rest }) => {
  return (
    <TextInput {...rest} multiline numberOfLines={5} textAlignVertical='top' />
  );
};

export default TextArea;
