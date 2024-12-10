import AntDesignIconButton from '@/components/ui/AntDesignIconButton';

import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

const CardHeader = () => {
  const router = useRouter();

  const handleBackIconClicked = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View className='bg-primary-foreground flex-row gap-2 items-center px-2 h-[44px] shadow'>
      <AntDesignIconButton
        iconName='arrowleft'
        onPress={handleBackIconClicked}
      />
      <Text className='text-lg text-text'>Thẻ ghi nhớ</Text>
      <View className='flex-grow' />
    </View>
  );
};
export default CardHeader;
