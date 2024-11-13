import { client } from '@/client/axiosClient';
import FormRow from '@/components/form/FormRow';
import Button from '@/components/ui/Button';
import { AxiosError } from 'axios';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const Register: React.FC = () => {
  const [values, setValues] = useState({
    email: '',
    username: '',
    fullname: '',
    password: '',
    rePassword: '',
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onChangeText = (key: keyof typeof values, value: string) => {
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const handleRegister = async () => {
    setLoading(true);

    try {
      await client.post('/auth/sign-up', {
        username: values.username,
        fullname: values.fullname,
        email: values.email,
        password: values.password,
      });

      router.navigate({ pathname: '/verify', params: { email: values.email } });
    } catch (err) {
      const e = err as AxiosError;
      const message = (e.response?.data as any)?.message as any;
      Toast.show({
        type: 'error',
        text1: 'Đã có lỗi xảy ra',
        text2: message ?? 'Lỗi không xác định',
        autoHide: true,
      });
    }

    setLoading(false);
  };

  return (
    <SafeAreaView className='bg-tertiary-background flex-1'>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className='bg-tertiary-background flex-1 items-center justify-center'>
          <Text className='text-text text-[24px] mb-10'>Đăng ký tài khoản</Text>
          <View className='w-[80%] gap-4'>
            <FormRow
              editable={!loading}
              label='Email'
              placeHolder='name@email.com'
              text={values.email}
              onChangeText={(value) => onChangeText('email', value)}
            />
            <FormRow
              editable={!loading}
              label='Tên đăng nhập'
              placeHolder='name'
              text={values.username}
              onChangeText={(value) => onChangeText('username', value)}
            />
            <FormRow
              editable={!loading}
              label='Họ và tên'
              placeHolder='fullname'
              text={values.fullname}
              onChangeText={(value) => onChangeText('fullname', value)}
            />
            <FormRow
              editable={!loading}
              label='Mật khẩu'
              placeHolder='********'
              text={values.password}
              onChangeText={(value) => onChangeText('password', value)}
              secureTextEntry
            />
            <FormRow
              editable={!loading}
              label='Nhập lại mật khẩu'
              placeHolder='********'
              text={values.rePassword}
              onChangeText={(value) => onChangeText('rePassword', value)}
              secureTextEntry
            />
            <Button
              className='mt-[20px]'
              onPress={handleRegister}
              disabled={loading}>
              Đăng ký
            </Button>
          </View>
          <Text className='text-text mt-16'>
            Đã có tài khoản?{' '}
            <Link
              href='/login'
              className='text-primary'
              disabled={loading}
              replace>
              Đăng nhập ngay
            </Link>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
export default Register;
