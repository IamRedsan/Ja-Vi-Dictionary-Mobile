import { authClient } from '@/client/axiosClient';
import FormRow from '@/components/form/FormRow';
import Avatar from '@/components/setting/Avatar';
import Button from '@/components/ui/Button';
import { useAppContext } from '@/context/appContext';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { Redirect } from 'expo-router';

const Profile = () => {
  const { user, updateUser } = useAppContext();
  const [fullname, setFullname] = useState(user?.fullname ?? '');
  const [loading, setLoading] = useState(false);

  const handleUpdateInfo = async () => {
    setLoading(true);

    try {
      const response = await authClient.put('/users/profile', { fullname });
      const { data: user } = response.data;
      updateUser(user);

      Toast.show({
        type: 'success',
        text1: 'Cập nhật thành công',
        text2: 'Đã cập nhật thông tin người dùng',
      });
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

  const handleUpdateAvatar = async (uri: string) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('avatar', {
      uri: uri,
      type: 'image/jpeg',
      name: 'avatar.jpeg',
    } as any);

    try {
      const response = await authClient.put('/users/profile', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      const { data: user } = response.data;
      updateUser(user);

      Toast.show({
        type: 'success',
        text1: 'Cập nhật thành công',
        text2: 'Đã cập nhật avatar người dùng',
      });
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

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = await manipulateAsync(result.assets[0].uri, [], {
        compress: 1,
        format: SaveFormat.JPEG,
      });

      Toast.show({
        type: 'info',
        text1: 'Vui lòng đợi',
        text2: 'Đang tải ảnh lên',
      });

      handleUpdateAvatar(uri.uri);
    }
  };

  if (!user) {
    return <Redirect href='/' />;
  }

  return (
    <ScrollView className='bg-primary-background flex-1 pt-10'>
      <Avatar
        username={user?.fullname ?? ''}
        url={user?.avatar}
        className='mb-10'
        isPressable={!loading}
        onPress={pickImage}
      />
      <View className='px-4'>
        <FormRow label='Email' text={user?.email ?? ''} editable={false} />
        <FormRow
          label='Họ và tên'
          text={fullname}
          onChangeText={setFullname}
          placeHolder='Chưa nhập'
        />
        <Button className='mt-10' onPress={handleUpdateInfo} disabled={loading}>
          Cập nhật
        </Button>
      </View>
    </ScrollView>
  );
};
export default Profile;
