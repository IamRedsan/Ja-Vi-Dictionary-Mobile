import EarthLoading from '@/components/loading/EarthLoading';
import Row from '@/components/translate/Row';
import { useAppContext } from '@/context/appContext';
import axios from 'axios';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { cssInterop } from 'nativewind';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

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
  const [imageUrl, setImageUrl] = useState<string>();
  const [result, setResult] = useState<
    { text: string; translated_text: string }[]
  >([]);

  useEffect(() => {
    const translateImage = async () => {
      setLoading(true);

      const formData = new FormData();
      formData.append('image', {
        uri: imgUri,
        type: 'image/jpeg',
        name: 'image.jpeg',
      } as any);

      try {
        const response = await axios.post(
          'http://10.20.1.78:5000/api/v1/translate/from-image',
          formData,
          {
            headers: {
              'content-type': 'multipart/form-data',
            },
          }
        );
        const { imageUrl, result } = response.data;
        setImageUrl(imageUrl);
        setResult(result);
      } catch (err) {
        console.log(err);
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
          source={imageUrl}
          contentFit='cover'
          transition={1000}
          placeholder={{ blurhash }}
        />
        <View className='bg-primary-background'>
          {result.map(({ text, translated_text }, index) => (
            <Row key={index} source={text} target={translated_text} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
export default FromImage;
