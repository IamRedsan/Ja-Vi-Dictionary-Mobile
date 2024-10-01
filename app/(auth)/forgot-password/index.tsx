import FormRow from '@/components/form/FormRow';
import Button from '@/components/ui/Button';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ForgotPassword: React.FC = () => {

  const router = useRouter();

  const [values, setValues] = useState({
    email: '',
    otp: '',
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
        <Text className='text-white text-[24px] mb-10'>Quên mật khẩu</Text>
        <View className='w-[80%] gap-4'>
          <FormRow
            label='Email'
            placeHolder='name@email.com'
            text={values.email}
            onChangeText={(value) => onChangeText('email', value)}
            errMsg='Vui lòng nhập email!'
          />
          <View className='flex-row'>
            <FormRow
              label='Mã OTP'
              placeHolder='000000'
              text={values.otp}
              onChangeText={(value) => onChangeText('otp', value)}
              errMsg='Vui lòng nhập mã OTP'
              secureTextEntry
              className='flex-grow mr-[10px]'
            />
            <Button className='h-[38px] mt-[26px] w-[20%]'>Gửi</Button>
          </View>
          <Button className='mt-[20px]' onPress={() => router.navigate('/forgot-password/reset-password')}>Xác nhận</Button>
        </View>
        <Link href='/login' className='text-primary mt-16'>
          <View className='flex-row items-center'>
            <FontAwesome
              name='chevron-left'
              className='text-primary text[10px]'
            />
            <Text className='text-primary ml-1'>Quay lại đăng nhập</Text>
          </View>
        </Link>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default ForgotPassword;
