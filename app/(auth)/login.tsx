import FormRow from '@/components/form/FormRow';
import Button from '@/components/ui/Button';
import { useAppContext } from '@/context/appContext';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';

const Login: React.FC = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const { setUser } = useAppContext();
  const router = useRouter();

  const onChangeText = (key: keyof typeof values, value: string) => {
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const fakeLogin = () => {
    setUser({
      avatar: '',
      createdDate: '',
      email: 'ino_emres@email.com',
      fullname: 'Kino Hermes',
      id: 'ino_ermes',
      role: 'user',
      username: 'ino_ermes',
    });
    router.navigate('/setting');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className='bg-tertiary-background flex-1 items-center justify-center'>
        <Text className='text-text text-[24px] mb-10'>Chào mừng trở lại!</Text>
        <View className='w-[80%] gap-4'>
          <FormRow
            label='Tên đăng nhập'
            placeHolder='name'
            text={values.username}
            onChangeText={(value) => onChangeText('username', value)}
          />
          <FormRow
            label='Mật khẩu'
            placeHolder='********'
            text={values.password}
            onChangeText={(value) => onChangeText('password', value)}
            secureTextEntry
          />
          <View className='flex-row justify-between'>
            <View />
            <Link href='/forgot-password' className='text-primary'>
              Quên mật khẩu?
            </Link>
          </View>
          <Button onPress={fakeLogin}>Đăng nhập</Button>
        </View>
        <Text className='text-text mt-16'>
          Chưa có tài khoản?{' '}
          <Link href='/register' className='text-primary'>
            Đăng ký ngay
          </Link>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Login;
