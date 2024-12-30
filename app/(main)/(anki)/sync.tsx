import CircleSpin from '@/components/loading/CircleSpin';
import Button from '@/components/ui/Button';
import { useAnkiSyncContext } from '@/context/ankiSyncContext';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
const Sync = () => {
  const { isSync, syncAction, prepareSync, sync, loading } =
    useAnkiSyncContext();
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  useEffect(() => {
    if (isSync) return;

    prepareSync();
  }, []);

  if (isSync) {
    return (
      <View className='flex-1 items-center justify-center bg-[rgba(0,0,0,0.54)]'>
        <View className='bg-tertiary-background p-10 rounded-[10px]'>
          <Text className='text-center text-text mb-10 text-[16px]'>
            Đã đồng bộ với Server
          </Text>
          <View className='flex-row justify-center gap-4'>
            <Button className='w-[100px]' onPress={closeModal}>
              Đồng ý
            </Button>
          </View>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View className='flex-1 items-center justify-center bg-[rgba(0,0,0,0.54)]'>
        <View className='bg-tertiary-background p-10 rounded-[10px]'>
          <ActivityIndicator color='blue' />
        </View>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback>
      <View className='flex-1 items-center justify-center bg-[rgba(0,0,0,0.54)]'>
        <TouchableWithoutFeedback>
          <View className='bg-tertiary-background p-10 rounded-[10px]'>
            {syncAction === null && (
              <React.Fragment>
                <Text className='text-center text-text mb-10 text-[16px]'>
                  Server đã có sự thay đổi, vui lòng chọn cách đồng bộ
                </Text>
                <View className='flex-row justify-center gap-4'>
                  <Button
                    className='w-[100px]'
                    onPress={() => {
                      sync('up');
                    }}>
                    Đẩy lên
                  </Button>
                  <Button
                    className='w-[100px]'
                    onPress={() => {
                      sync('down');
                    }}>
                    Kéo về
                  </Button>
                  <Button
                    className='w-[100px]'
                    type='dangerous'
                    onPress={closeModal}>
                    Hủy
                  </Button>
                </View>
              </React.Fragment>
            )}
            {syncAction !== null && (
              <React.Fragment>
                <Text className='text-center text-text mb-10 text-[16px]'>
                  Đồng bộ với server?
                </Text>
                <View className='flex-row justify-center gap-4'>
                  <Button
                    className='w-[100px]'
                    onPress={() => {
                      sync(syncAction);
                    }}>
                    Đồng bộ
                  </Button>
                  <Button
                    className='w-[100px]'
                    type='dangerous'
                    onPress={closeModal}>
                    Hủy
                  </Button>
                </View>
              </React.Fragment>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Sync;
