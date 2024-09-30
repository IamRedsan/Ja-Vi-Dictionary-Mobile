import React from 'react';
import { TextInput as TI, TextInputProps as TIProps } from 'react-native';

interface TextInputProps extends TIProps {}

const TextInput: React.FC<TextInputProps> = ({ className, ...rest }) => {
  return (
    <TI
      className={`border-2 border-[#CBD5E1] focus:border-primary rounded-lg bg-white placeholder:text-[#6C757D] px-4 py-1 caret-primary ${
        className ? className : ''
      }`}
      {...rest}
    />
  );
};
export default TextInput;
