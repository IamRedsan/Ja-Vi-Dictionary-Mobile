import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown as DropdownLib } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { cssInterop, useColorScheme } from 'nativewind';

cssInterop(AntDesign, {
  className: {
    target: 'style',
    nativeStyleToProp: { size: true },
  } as any,
});

type AntDesignName = keyof typeof AntDesign.glyphMap;

interface DropdownWithLabelProps {
  label?: string;
  iconName?: AntDesignName;
  data: { label: string; value: string }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
}

const DropdownWithLabel: React.FC<DropdownWithLabelProps> = ({
  data,
  label,
  onChange,
  placeholder,
  searchPlaceholder,
  value: v,
  iconName,
  disabled,
}) => {
  const [value, setValue] = useState<string>();
  const [isFocus, setIsFocus] = useState(false);
  const { colorScheme } = useColorScheme();

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          className={`absolute bg-primary-background left-[22px] top-[8px] z-[999] px-[8px] text-[14px] ${
            isFocus ? 'text-primary' : 'text-text'
          }`}>
          {label ?? 'Dropdown'}
        </Text>
      );
    }
    return null;
  };

  return (
    <View className='bg-primary-background p-[16px]'>
      {renderLabel()}
      <DropdownLib
        style={[
          styles.dropdown,
          isFocus && { borderColor: colors[colorScheme ?? 'light'].primary },
        ]}
        placeholderStyle={[
          styles.placeholderStyle,
          { color: colors[colorScheme ?? 'light'].text },
        ]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          {
            color: colors[colorScheme ?? 'light'].text,
          },
        ]}
        inputSearchStyle={[
          styles.inputSearchStyle,
          { color: colors[colorScheme ?? 'light'].text },
        ]}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField='label'
        valueField='value'
        placeholder={!isFocus ? placeholder ?? 'Chọn một mục' : '...'}
        searchPlaceholder={searchPlaceholder ?? 'Tìm kiếm...'}
        value={v ?? value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          if (onChange) onChange(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            name={iconName ?? 'Safety'}
            className={`text-[20px] mr-[5px] ${
              isFocus ? 'text-primary' : 'text-text'
            }`}
          />
        )}
        containerStyle={{
          backgroundColor: colors[colorScheme ?? 'light'].background,
        }}
        itemTextStyle={{
          color: colors[colorScheme ?? 'light'].text,
        }}
        activeColor={colors[colorScheme ?? 'light'].primary}
        disable={disabled}
      />
    </View>
  );
};

export default DropdownWithLabel;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

const colors = {
  light: {
    primary: '#24b6b7',
    text: '#000000',
    background: '#f5f5f5',
  },
  dark: {
    primary: '#ffbade',
    text: '#ffffff',
    background: '#2b2a3b',
  },
};
