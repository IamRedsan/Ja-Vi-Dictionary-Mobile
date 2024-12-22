import { client } from '@/client/axiosClient';
import { AxiosError } from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import Toast from 'react-native-toast-message';

const Verify = () => {
  const [loading, setLoading] = useState(false);
  const { email } = useLocalSearchParams();
  const [retry, setRetry] = useState(60);
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const color = colorScheme === 'light' ? '#24b6b7' : '#ffbade';
  const borderColor = colorScheme === 'light' ? '#000000' : '#ffffff';

  useEffect(() => {
    const i = setInterval(() => {
      setRetry((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(i);
    };
  }, []);

  const handleVerify = async (otp: string) => {
    setLoading(true);

    try {
      await client.post('auth/verify', {
        email,
        otp,
      });

      Toast.show({
        type: 'success',
        text1: 'Xác thực thành công',
        text2: 'Vui lòng đăng nhập lại',
      });

      router.navigate('/login');
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Xác thực thất bại',
        text2: 'Vui lòng thử lại',
      });
    }

    setLoading(false);
  };

  const handleResend = async () => {
    setLoading(true);

    try {
      await client.post('/auth/resend-otp', { email });
      setRetry(60);
    } catch (err) {
      const e = err as AxiosError;
      const message = (e.response?.data as any)?.message as any;
      Toast.show({
        type: 'error',
        text1: 'Đã có lỗi xảy ra',
        text2: message ?? 'Lỗi không xác định',
      });
    }

    setLoading(false);
  };

  return (
    <View className='flex-1 items-center justify-center h-full bg-primary-background'>
      <Text className='text-text text-[30px] font-bold text-center'>
        Xác thực tài khoản
      </Text>
      <Text className='text-text text-[16px] text-center mb-16'>
        Nhập mã OTP mà bạn nhận được vào đây
      </Text>
      <OtpInput
        numberOfDigits={4}
        onFilled={handleVerify}
        disabled={loading}
        theme={{
          containerStyle: {
            paddingHorizontal: 40,
          },
          pinCodeContainerStyle: {
            borderColor: borderColor,
          },
          pinCodeTextStyle: {
            color: color,
          },
          focusStickStyle: {
            backgroundColor: color,
          },
          focusedPinCodeContainerStyle: {
            borderColor: color,
          },
        }}
      />
      <Text className='text-[16px] mt-16 text-text'>
        Không nhận được mã OTP?
      </Text>
      <TouchableOpacity disabled={loading || retry >= 0} onPress={handleResend}>
        {retry >= 0 ? (
          <Text className='text-gray-500 font-bold text-[20px]'>{`${retry}s`}</Text>
        ) : (
          <Text className='text-primary font-bold text-[20px]'>Gửi mã mới</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default Verify;
