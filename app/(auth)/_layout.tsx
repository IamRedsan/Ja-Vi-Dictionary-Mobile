import { Slot } from 'expo-router';
import { cssInterop } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';

cssInterop(SafeAreaView, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

const AuthLayout: React.FC = () => {
  return (
    <>
      <SafeAreaView className='bg-tertiary-background' />
      <Slot />
    </>
  );
};

export default AuthLayout;
