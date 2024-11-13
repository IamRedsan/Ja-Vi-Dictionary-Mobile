import Stack from '@/components/Stack';
import { Stack as S } from 'expo-router';
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
    <Stack>
      <S.Screen
        name='login'
        options={{ headerShown: false, headerBackground: undefined }}
      />
      <S.Screen
        name='register'
        options={{ headerShown: false, headerBackground: undefined }}
      />
      <S.Screen name='verify' options={{ title: 'Xác thực tài khoản' }} />
    </Stack>
  );
};

export default AuthLayout;
