import React from 'react';
import { TextInput as TI, TextInputProps as TIProps } from 'react-native';

type TextInputProps = {};

const TextInput: React.FC<TextInputProps & TIProps> = ({
  className,
  ...rest
}) => {
  return (
    <TI
      className={`px-4 py-0.5 border-border focus:border-ring border rounded-[8] w-full bg-background text-secondary-foreground placeholder:text-muted-foreground${
        className ? ' ' + className : ''
      }`}
      {...rest}
    />
  );
};
export default TextInput;
