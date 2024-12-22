import { client } from '@/client/axiosClient';
import FormRow from '@/components/form/FormRow';
import Button from '@/components/ui/Button';
import { useAppContext } from '@/context/appContext';
import { AxiosError } from 'axios';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const Login: React.FC = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const { setUser } = useAppContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onChangeText = (key: keyof typeof values, value: string) => {
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await client.post('/auth/login', {
        email: values.email,
        password: values.password,
      });

      const { user, refreshToken, accessToken } = response.data.data;
      await setUser(user, accessToken, refreshToken);
    } catch (err) {
      const e = err as AxiosError;
      if (e.response?.status === 403) {
        Toast.show({
          type: 'info',
          text1: 'Chưa xác thực tài khoản',
          text2: 'Vui lòng xác thực tài khoản qua email',
          autoHide: true,
        });
        router.navigate({
          pathname: '/verify',
          params: {
            email: values.email,
          },
        });
      } else {
        const message = (e.response?.data as any)?.message as any;
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: message ?? 'Lỗi không xác định',
          autoHide: true,
        });
      }
    }

    setLoading(false);
  };

  return (
    <SafeAreaView className='bg-tertiary-background flex-1'>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className='bg-tertiary-background flex-1 items-center justify-center'>
          <Text className='text-text text-[24px] mb-10'>
            Chào mừng trở lại!
          </Text>
          <View className='w-[80%] gap-4'>
            <FormRow
              label='Email'
              placeHolder='name@email.com'
              text={values.email}
              onChangeText={(value) => onChangeText('email', value)}
              editable={!loading}
            />
            <FormRow
              label='Mật khẩu'
              placeHolder='********'
              text={values.password}
              onChangeText={(value) => onChangeText('password', value)}
              secureTextEntry
              editable={!loading}
            />
            <View className='flex-row justify-between'>
              <View />
              <Link href='/forgot-password' className='text-primary' disabled>
                Quên mật khẩu?
              </Link>
            </View>
            <Button onPress={handleLogin} disabled={loading}>
              Đăng nhập
            </Button>
          </View>
          <Text className='text-text mt-16'>
            Chưa có tài khoản?{' '}
            <Link href='/register' className='text-primary' disabled={loading}>
              Đăng ký ngay
            </Link>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
export default Login;
