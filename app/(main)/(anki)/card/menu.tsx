import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
const Menu = () => {
  const router = useRouter();
  const { id }: { id: string } = useLocalSearchParams();

  const handleBack = () => {
    router.back();
  };

  return (
    <TouchableWithoutFeedback onPress={handleBack}>
      <View className='flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]'>
        <TouchableWithoutFeedback>
          <View className='w-[80%] rounded-[10px] shadow overflow-hidden bg-tertiary-background py-4'>
            <Text className='text-primary text-xl font-bold px-4 py-2'>
              Thẻ học
            </Text>
            <View className='bg-primary'>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  router.replace({
                    pathname: '/(main)/(anki)/card/delete-card',
                    params: { cardId: id, fromPath: 'browse' },
                  });
                }}>
                <Text className='text-red-500 text-lg w-full bg-tertiary-background py-2 px-4'>
                  Xoá thẻ
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  router.replace({
                    pathname: '/(main)/(anki)/card',
                    params: { id, fromPath: 'browse' },
                  });
                }}>
                <Text className='text-text text-lg w-full bg-tertiary-background py-2 px-4'>
                  Sửa thẻ
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Menu;
