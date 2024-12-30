import Button from '@/components/ui/Button';
import { deleteTablesQuery } from '@/constants/Query';
import { useAppContext } from '@/context/appContext';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

const Logout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { removeUser } = useAppContext();
  const db = useSQLiteContext();

  const handleLogout = async () => {
    setLoading(true);
    await db.execAsync(deleteTablesQuery);
    await removeUser();
    setLoading(false);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <TouchableWithoutFeedback onPress={handleCancel}>
      <View className='flex-1 items-center justify-center bg-[rgba(0,0,0,0.54)]'>
        <TouchableWithoutFeedback>
          <View className='bg-tertiary-background p-10 rounded-[10px]'>
            <Text className='text-center text-text mb-10 text-[16px]'>
              Bạn có muốn đăng xuất
            </Text>
            <View className='flex-row justify-center gap-4'>
              <Button
                className='w-[100px]'
                onPress={handleCancel}
                disabled={loading}>
                Huỷ
              </Button>
              <Button
                className='w-[100px]'
                type='dangerous'
                onPress={handleLogout}
                disabled={loading}>
                Đăng xuất
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Logout;
