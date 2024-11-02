import FormRow from '@/components/form/FormRow';
import Button from '@/components/ui/Button';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';

const Register: React.FC = () => {
  const [values, setValues] = useState({
    email: '',
    username: '',
    fullname: '',
    password: '',
    rePassword: '',
  });

  const onChangeText = (key: keyof typeof values, value: string) => {
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className='bg-tertiary-background flex-1 items-center justify-center'>
        <Text className='text-text text-[24px] mb-10'>Đăng ký tài khoản</Text>
        <View className='w-[80%] gap-4'>
          <FormRow
            label='Email'
            placeHolder='name@email.com'
            text={values.email}
            onChangeText={(value) => onChangeText('email', value)}
          />
          <FormRow
            label='Tên đăng nhập'
            placeHolder='name'
            text={values.username}
            onChangeText={(value) => onChangeText('username', value)}
          />
          <FormRow
            label='Họ và tên'
            placeHolder='fullname'
            text={values.fullname}
            onChangeText={(value) => onChangeText('fullname', value)}
          />
          <FormRow
            label='Mật khẩu'
            placeHolder='********'
            text={values.password}
            onChangeText={(value) => onChangeText('password', value)}
            secureTextEntry
          />
          <FormRow
            label='Nhập lại mật khẩu'
            placeHolder='********'
            text={values.password}
            onChangeText={(value) => onChangeText('rePassword', value)}
            secureTextEntry
          />
          <Button className='mt-[20px]'>Đăng ký</Button>
        </View>
        <Text className='text-text mt-16'>
          Đã có tài khoản?{' '}
          <Link href='/login' className='text-primary'>
            Đăng nhập ngay
          </Link>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Register;
