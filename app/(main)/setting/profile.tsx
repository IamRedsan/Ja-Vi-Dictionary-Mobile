import FormRow from '@/components/form/FormRow';
import Avatar from '@/components/setting/Avatar';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
const Profile = () => {
  const [name, setName] = useState('');

  return (
    <ScrollView className='bg-primary-background flex-1 pt-10'>
      <Avatar username='Kino' className='mb-10' isPressable />
      <View className='px-4'>
        <FormRow label='Email' text='ino_ermes@email.com' editable={false} />
        <FormRow label='Tên đăng nhập' text='ino_ermes' editable={false} />
        <FormRow
          label='Họ và tên'
          text={name}
          onChangeText={setName}
          placeHolder='Chưa nhập'
        />
        <FormRow label='Ngày tham gia' text='2024/10/13' editable={false} />
        <Button className='mt-10'>Cập nhật</Button>
      </View>
    </ScrollView>
  );
};
export default Profile;
