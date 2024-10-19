import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { cssInterop } from 'nativewind';
import FontAwesome from '@expo/vector-icons/FontAwesome';

cssInterop(Image, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

interface AvatarProps {
  url?: string;
  username: string;
  className?: string;
  onPress?: () => void;
  isPressable?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  username,
  url,
  className,
  isPressable,
  onPress,
}) => {
  return (
    <View className={`w-full ${className ?? ''}`}>
      <View className='relative self-center'>
        <Image
          source={url ?? require('../../assets/images/F_ac1CoXAAA3nxs.jpg')}
          placeholder={{ blurhash }}
          contentFit='cover'
          transition={1000}
          className='w-[30%] bg-[#0553] rounded-full aspect-square'
        />

        {isPressable && (
          <TouchableOpacity
            onPress={onPress}
            className='absolute right-0 bottom-0 bg-primary-foreground w-[50px] h-[50px] aspect-square rounded-full flex items-center justify-center border-[4px] border-primary-background'>
            <FontAwesome name='camera' className='text-text text-[20px]' />
          </TouchableOpacity>
        )}
      </View>
      <Text className='text-text text-center mt-4 font-bold text-[24px]'>
        {username}
      </Text>
    </View>
  );
};
export default Avatar;
