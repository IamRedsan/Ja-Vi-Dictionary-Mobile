import { View, Text } from 'react-native';
const Header = () => {
  return (
    <View className='flex flex-row justify-between items-center p-4 border-b-anki-text border-b-[0.5px]'>
      <Text className='flex-grow-[1] text-lg text-anki-text'>Bộ thẻ</Text>
      <Text className='w-[25%] text-lg text-anki-text text-right'>Thẻ mới</Text>
      <Text className='w-[25%] text-lg text-anki-text text-right'>
        Đang học
      </Text>
      <Text className='w-[25%] text-lg text-anki-text text-right'>Học lại</Text>
    </View>
  );
};
export default Header;
