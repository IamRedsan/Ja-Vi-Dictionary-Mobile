import { router, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'nativewind';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
const DeckModal = () => {
  const { deckId, deckName } = useLocalSearchParams();
  const { colorScheme } = useColorScheme();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        router.dismiss();
      }}>
      <View className='flex-1 justify-center bg-[rgba(0,0,0,0.54)]'>
        <TouchableWithoutFeedback>
          <View className='bg-tertiary-background rounded-[10px] max-h-2/3 w-fit flex-col mx-10'>
            <Text className='text-primary text-2xl ml-4 mr-3 my-2'>
              {deckName}
            </Text>
            <View className='flex-col'>
              <TouchableHighlight
                underlayColor={colorScheme === 'light' ? '#e1e1e1' : '#323232'}
                activeOpacity={0.6}
                onPress={() => {
                  router.push({
                    pathname: '/(main)/(anki)/update-deck',
                    params: {
                      deckId: deckId,
                    },
                  });
                }}>
                <View className='w-full py-4'>
                  <Text className='text-text text-xl ml-2'>
                    Chỉnh sửa bộ thẻ
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={colorScheme === 'light' ? '#e1e1e1' : '#323232'}
                activeOpacity={0.6}
                onPress={() => {
                  router.push({
                    pathname: '/(main)/(anki)/delete-deck',
                    params: {
                      deckId: deckId,
                    },
                  });
                }}>
                <View className='w-full py-4'>
                  <Text className='text-text text-xl ml-2'>Xóa bộ thẻ</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={colorScheme === 'light' ? '#e1e1e1' : '#323232'}
                activeOpacity={0.6}
                onPress={() => {
                  router.replace({ pathname: '/(main)/(anki)/card' });
                }}>
                <View className='w-full py-4'>
                  <Text className='text-text text-xl ml-2'>Thêm thẻ học</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                className='rounded-b-[10px]'
                underlayColor={colorScheme === 'light' ? '#e1e1e1' : '#323232'}
                activeOpacity={0.6}
                onPress={() => {
                  router.replace('/(main)/(anki)/card/browse');
                }}>
                <View className='w-full py-4'>
                  <Text className='text-text text-xl ml-2'>Tất cả thể học</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default DeckModal;
