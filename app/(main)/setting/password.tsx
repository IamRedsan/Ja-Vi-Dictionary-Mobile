import FormRow from '@/components/form/FormRow';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

const Password = () => {
  const [values, setValues] = useState({
    password: '',
    newPassword: '',
    reNewPassword: '',
  });

  const onChangeText = (key: keyof typeof values, value: string) => {
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  return (
    <ScrollView className='bg-primary-background flex-1 pt-10'>
      <View className='px-4'>
        <FormRow
          label='Mật khẩu hiện tại'
          placeHolder='********'
          text={values.password}
          onChangeText={(value) => onChangeText('password', value)}
          errMsg='Vui lòng nhập mật khẩu'
          secureTextEntry
        />
        <FormRow
          label='Mật khẩu mới'
          placeHolder='********'
          text={values.newPassword}
          onChangeText={(value) => onChangeText('newPassword', value)}
          errMsg='Vui lòng nhập mật khẩu'
          secureTextEntry
        />
        <FormRow
          label='Xác nhận mật khẩu'
          placeHolder='********'
          text={values.reNewPassword}
          onChangeText={(value) => onChangeText('reNewPassword', value)}
          errMsg='Mật khẩu không khớp!'
          secureTextEntry
        />
        <Button className='mt-10'>Cập nhật</Button>
      </View>
    </ScrollView>
  );
};
export default Password;
