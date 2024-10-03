import FormRow from '@/components/form/FormRow';
import Button from '@/components/ui/Button';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ResetPassword: React.FC = () => {
  const [values, setValues] = useState({
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
      <View className='bg-tertiary-background flex-1 items-center justify-center rounded-tr-[]'>
        <Text className='text-text text-[24px] mb-10'>Quên mật khẩu</Text>
        <View className='w-[80%] gap-4'>
          <FormRow
            label='Mật khẩu mới'
            placeHolder='********'
            text={values.password}
            onChangeText={(value) => onChangeText('password', value)}
            errMsg='Không được để trống!'
          />
          <FormRow
            label='Nhập lại mật khẩu'
            placeHolder='********'
            text={values.rePassword}
            onChangeText={(value) => onChangeText('rePassword', value)}
            errMsg='Mật khẩu không khớp!'
            secureTextEntry
          />
          <Button className='mt-[20px]'>Đổi mật khẩu</Button>
        </View>
        <Link href='../' className='text-primary mt-16'>
          <View className='flex-row items-center'>
            <FontAwesome
              name='chevron-left'
              className='text-primary text[10px]'
            />
            <Text className='text-primary ml-1'>Quay lại</Text>
          </View>
        </Link>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default ResetPassword;
