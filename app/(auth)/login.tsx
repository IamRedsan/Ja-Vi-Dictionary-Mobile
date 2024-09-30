import FormRow from '@/components/form/FormRow';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import { Link } from 'expo-router';
import { useState } from 'react';
import { View, Text } from 'react-native';
const Login = () => {
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
    <View className='bg-[#2A2A2A] flex-1 items-center justify-center'>
      <Text className='text-white text-[24px] mb-10'>Chào mừng trở lại!</Text>
      <View className='w-[80%] gap-4'>
        <FormRow
          label='Email'
          placeHolder='name@email.com'
          text={values.email}
          onChangeText={(value) => onChangeText('email', value)}
          errMsg='Vui lòng nhập email!'
          className=''
        />
        <FormRow
          label='Mật khẩu'
          placeHolder='********'
          text={values.password}
          onChangeText={(value) => onChangeText('password', value)}
          errMsg='Vui lòng nhập mật khẩu'
          secureTextEntry
          className=''
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
  );
};
export default Login;
