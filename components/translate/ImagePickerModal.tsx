import { useState } from 'react';
import { View, Modal, TouchableWithoutFeedback } from 'react-native';
import Button from '../ui/Button';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { useRouter } from 'expo-router';

const ImagePickerModal = () => {
  const [show, setShow] = useState(false);
  const [cameraPermissions, requestPermission] =
    ImagePicker.useCameraPermissions();
  const router = useRouter();

  const takeAPicture = async () => {
    if (!cameraPermissions?.granted) {
      await requestPermission();
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      // aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = await manipulateAsync(result.assets[0].uri, [], {
        compress: 1,
        format: SaveFormat.JPEG,
      });
      toTranslate(uri.uri, `${uri.width}/${uri.height}`);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      // aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = await manipulateAsync(result.assets[0].uri, [], {
        compress: 1,
        format: SaveFormat.JPEG,
      });
      toTranslate(uri.uri, `${uri.width}/${uri.height}`);
    }
  };

  const toTranslate = (imgUri: string, ratio: string) => {
    router.push({
      pathname: '/translate/from-image',
      params: {
        imgUri,
        ratio,
      },
    });
    setShow(false);
  };

  return (
    <>
      <Modal
        animationType='fade'
        visible={show}
        transparent
        onRequestClose={() => setShow(false)}>
        <TouchableWithoutFeedback onPress={() => setShow(false)}>
          <View className='flex-1 bg-[rgba(0,0,0,0.54)] items-center justify-center'>
            <TouchableWithoutFeedback>
              <View className='flex gap-6 p-10 bg-[rgba(0,0,0,0.44)] rounded-lg relative'>
                <Button
                  startIcon='camera'
                  className='px-14 py-6'
                  onPress={takeAPicture}>
                  Camera
                </Button>
                <Button
                  startIcon='image'
                  className='px-14 py-6'
                  onPress={pickImage}>
                  Thư viện
                </Button>
                <Button
                  startIcon='close'
                  className='absolute top-[-10] right-[-10] w-10 h-10'
                  onPress={() => setShow(false)}
                  type='round'
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View>
        <Button
          onPress={() => setShow(true)}
          startIcon='image'
          className='absolute bottom-4 right-4 p-[20px]'
          type='round'
        />
      </View>
    </>
  );
};
export default ImagePickerModal;
