import FormRow from '@/components/form/FormRow';
import Button from '@/components/ui/Button';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';

const Login: React.FC = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const onChangeText = (key: keyof typeof values, value: string) => {
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className='bg-[#2A2A2A] flex-1 items-center justify-center rounded-tr-[]'>
        <Text className='text-white text-[24px] mb-10'>Chào mừng trở lại!</Text>
        <View className='w-[80%] gap-4'>
          <FormRow
            label='Email'
            placeHolder='name@email.com'
            text={values.email}
            onChangeText={(value) => onChangeText('email', value)}
            errMsg='Vui lòng nhập email!'
          />
          <FormRow
            label='Mật khẩu'
            placeHolder='********'
            text={values.password}
            onChangeText={(value) => onChangeText('password', value)}
            errMsg='Vui lòng nhập mật khẩu'
            secureTextEntry
          />
          <View className='flex-row justify-between'>
            <View />
            <Link href='/forgot-password' className='text-primary'>
              Quên mật khẩu?
            </Link>
          </View>
          <Button>Đăng nhập</Button>
        </View>
        <Text className='text-white mt-16'>
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
