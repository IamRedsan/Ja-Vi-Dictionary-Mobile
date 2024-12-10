import AntDesign from '@expo/vector-icons/AntDesign';
import { cssInterop } from 'nativewind';
import { forwardRef, useState } from 'react';
import { Pressable, PressableProps, View } from 'react-native';

cssInterop(AntDesign, {
  className: {
    target: 'style',
    nativeStyleToProp: { size: true },
  } as any,
});

type AntDesignName = keyof typeof AntDesign.glyphMap;

interface AntDesignIconButton extends PressableProps {
  iconName: AntDesignName;
  iconClassName?: string;
}

const AntDesignIconButton = forwardRef<View, AntDesignIconButton>(
  ({ iconClassName, iconName, className, ...rest }, ref) => {
    const [isHover, setIsHover] = useState(false);

    return (
      <Pressable
        {...rest}
        className={`h-10 w-10 rounded-full justify-center items-center ${
          isHover ? 'bg-primary' : ''
        } ${className}`}
        ref={ref}
        onPressIn={() => setIsHover(true)}
        onPressOut={() => setIsHover(false)}>
        <AntDesign
          name={iconName}
          className={`${
            isHover ? 'text-text-button' : 'text-text'
          } text-[20px] ${iconClassName ?? ''}`}
        />
      </Pressable>
    );
  }
);
export default AntDesignIconButton;
