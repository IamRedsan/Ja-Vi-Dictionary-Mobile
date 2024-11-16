import { authClient } from '@/client/axiosClient';
import FormRow from '@/components/form/FormRow';
import Button from '@/components/ui/Button';
import { useAppContext } from '@/context/appContext';
import { AxiosError } from 'axios';
import { Redirect } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';

const Password = () => {
  const { user } = useAppContext();
  const [loading, setLoading] = useState(false);

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

  const handleChangePassword = async () => {
    if (values.newPassword !== values.reNewPassword) {
      Toast.show({
        type: 'info',
        text1: 'Mật khẩu không khớp',
        text2: 'Vui lòng kiểm tra lại',
      });
      return;
    }

    setLoading(true);

    try {
      await authClient.put('/users/profile', {
        password: values.newPassword,
        oldPassword: values.password,
      });

      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: 'Cập nhật mật khẩu thành công',
      });
    } catch (err) {
      const e = err as AxiosError;
      const { message } = (e.response?.data as any)?.data;

      Toast.show({
        type: 'error',
        text1: 'Thất bại',
        text2: message ?? 'Đã có lỗi xảy ra',
      });
    }

    setLoading(false);
  };

  if (!user) {
    return <Redirect href='/' />;
  }

  return (
    <ScrollView className='bg-primary-background flex-1 pt-10'>
      <View className='px-4'>
        <FormRow
          label='Mật khẩu hiện tại'
          placeHolder='********'
          text={values.password}
          onChangeText={(value) => onChangeText('password', value)}
          secureTextEntry
          editable={!loading}
        />
        <FormRow
          label='Mật khẩu mới'
          placeHolder='********'
          text={values.newPassword}
          onChangeText={(value) => onChangeText('newPassword', value)}
          secureTextEntry
          editable={!loading}
        />
        <FormRow
          label='Xác nhận mật khẩu'
          placeHolder='********'
          text={values.reNewPassword}
          onChangeText={(value) => onChangeText('reNewPassword', value)}
          secureTextEntry
          editable={!loading}
        />
        <Button
          className='mt-10'
          onPress={handleChangePassword}
          disabled={loading}>
          Cập nhật
        </Button>
      </View>
    </ScrollView>
  );
};
export default Password;
