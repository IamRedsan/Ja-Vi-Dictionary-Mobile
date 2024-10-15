import { cssInterop } from 'nativewind';
import { View, Text } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

cssInterop(SafeAreaView, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

const Decks = () => {
  return (
    <View>
      <SafeAreaView className='bg-primary-background' />
      <Text>Decks</Text>
    </View>
  );
};
export default Decks;
