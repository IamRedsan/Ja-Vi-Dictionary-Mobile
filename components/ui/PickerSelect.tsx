import React, { useRef } from 'react';
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
  callAPI?: (value: string) => void;
}

const PickerSelect: React.FC<PickerSelectProps> = ({
  value,
  items,
  setValue,
  callAPI,
}) => {
  const { colorScheme } = useColorScheme();
  const style = colorScheme === 'light' ? styleLight : styleDark;
  const pickerRef = useRef<RNPickerSelect>(null);

  return (
    <TouchableOpacity
      onPress={() => {
        pickerRef.current?.togglePicker();
      }}
      className="bg-secondary-background rounded-xl w-20 flex-row justify-between items-center max-h-24"
    >
      <RNPickerSelect
        ref={pickerRef}
        onValueChange={(value) => {
          setValue(value);
          if (Platform.OS === 'android') {
            callAPI && callAPI(value);
          }
        }}
        onDonePress={() => {
          callAPI && callAPI(value);
        }}
        onClose={() => {
          callAPI && callAPI(value);
        }}
        items={items}
        value={value}
        placeholder={{}}
        doneText="Đóng"
        style={style}
        useNativeAndroidPickerStyle={false}
      />
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
