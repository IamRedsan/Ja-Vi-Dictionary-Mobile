import { View, Text } from 'react-native';
const Header = () => {
  return (
    <View className='flex-row px-2 py-1 bg-primary'>
      <Text
        numberOfLines={1}
        className='flex-grow-[1] text-center text-text-button text-lg border-r-[0.5px] border-r-text-button flex-1'>
        Từ vựng
      </Text>
      <Text
        numberOfLines={1}
        className='flex-grow-[2] text-center text-text-button text-lg flex-1'>
        Ví dụ
      </Text>
    </View>
  );
};
export default Header;
