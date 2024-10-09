import React, { useRef, useState } from 'react';
import { useColorScheme } from 'nativewind';
import { Platform, StyleSheet, View, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface PickerSelectProps {
  items: {
    label: string;
    value: string;
  }[];
  value: string;
  setValue: (value: string) => void;
  className?: string;
}

const PickerSelect: React.FC<PickerSelectProps> = ({
  value,
  items,
  setValue,
  className,
}) => {
  const { colorScheme } = useColorScheme();
  const style = colorScheme === 'light' ? styleLight : styleDark;
  const pickerRef = useRef<RNPickerSelect>(null);
  const [tempValue, setTempValue] = useState<string>(value); // Initialize tempValue with the current value

  return (
    <TouchableOpacity
      onPress={() => {
        pickerRef.current?.togglePicker();
      }}
      className={className}
    >
      <View>
        <RNPickerSelect
          ref={pickerRef}
          onValueChange={(newValue) => {
            setTempValue(newValue);
            if (Platform.OS === 'android') {
              setValue(newValue);
            }
          }}
          onDonePress={() => {
            setValue(tempValue);
          }}
          onClose={() => {
            setValue(tempValue);
          }}
          items={items}
          value={tempValue}
          placeholder={{}}
          doneText="Xác nhận"
          style={style}
          useNativeAndroidPickerStyle={false}
        />
      </View>
      <View className="pr-2">
        <FontAwesome
          name="chevron-down"
          size={12}
          color={colorScheme === 'light' ? '#525356' : '#fefefe'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default PickerSelect;

const styleLight = StyleSheet.create({
  inputIOS: {
    color: '#525356',
    fontSize: 16,
    padding: 4,
    paddingLeft: 8,
    justifyContent: 'center',
    textAlign: 'center',
  },
  modalViewMiddle: {
    backgroundColor: '#dcdcdc',
    borderTopWidth: 0,
  },
  modalViewBottom: {
    backgroundColor: '#dcdcdc',
    borderWidth: 0,
  },
  chevron: {
    display: 'none',
  },
  done: {
    color: '#24b6b7',
  },
});

const styleDark = StyleSheet.create({
  inputIOS: {
    color: '#fefefe',
    fontSize: 16,
    padding: 4,
    paddingLeft: 8,
  },
  modalViewMiddle: {
    backgroundColor: '#3c3b4d',
    borderTopWidth: 0,
  },
  modalViewBottom: {
    backgroundColor: '#3c3b4d',
    borderWidth: 0,
  },
  chevron: {
    display: 'none',
  },
  done: {
    color: '#ffbade',
  },
});
