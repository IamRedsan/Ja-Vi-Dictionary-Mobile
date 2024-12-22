import Stack from '@/components/Stack';
import { useAppContext } from '@/context/appContext';
import { Stack as S, usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';

const AuthLayout: React.FC = () => {
  const { user } = useAppContext();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (user !== undefined) {
      router.back();
    }
  }, [pathname, user]);

  return (
    <Stack>
      <S.Screen name='(auth-form)' options={{ headerShown: false }} />
      <S.Screen name='verify' options={{ title: 'Xác thực tài khoản' }} />
    </Stack>
  );
};

export default AuthLayout;
