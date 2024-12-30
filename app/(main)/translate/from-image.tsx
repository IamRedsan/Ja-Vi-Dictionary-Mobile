import { aiClient } from '@/client/axiosClient';
import EarthLoading from '@/components/loading/EarthLoading';
import Button from '@/components/ui/Button';
import { useTranslateContext } from '@/context/translateContext';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { cssInterop } from 'nativewind';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

cssInterop(Image, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true },
  } as any,
});

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const FromImage = () => {
  const { imgUri, ratio } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const {
    setText: setTxt,
    translate,
    model,
    toggleModel,
  } = useTranslateContext();
  const router = useRouter();

  useEffect(() => {
    if (model === 'vija') {
      toggleModel();
    }

    const translateImage = async () => {
      setLoading(true);

      const formData = new FormData();
      formData.append('image', {
        uri: imgUri,
        type: 'image/jpeg',
        name: 'image.jpeg',
      } as any);

      try {
        const response = await aiClient.post(
          '/translate/image-to-text',
          formData,
          {
            headers: {
              'content-type': 'multipart/form-data',
            },
          }
        );
        const { text } = response.data;

        setText(text);
      } catch (err) {
        Toast.show({
          type: 'error',
          text1: 'Có gì đó không đúng',
          text2: '色を重ねて',
        });
      }

      setLoading(false);
    };

    translateImage();
  }, [imgUri]);

  if (loading) {
    return (
      <View className='justify-center items-center flex-1 bg-primary-background'>
        <EarthLoading />
      </View>
    );
  }

  return (
    <ScrollView>
      <View className='flex-1'>
        <Image
          className={`bg-primary w-full flex-1 aspect-[${ratio}]`}
          style={{
            aspectRatio: ratio as string,
          }}
          source={imgUri}
          contentFit='cover'
          transition={1000}
          placeholder={{ blurhash }}
          allowDownscaling={false}
        />
        <View className='bg-primary-background p-4'>
          <Text className='text-lg'>{text}</Text>
        </View>
        <View>
          <Button
            onPress={() => {
              setTxt(text);
              translate(text);
              router.back();
            }}>
            Dịch
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};
export default FromImage;
