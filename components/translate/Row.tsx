import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Speech from 'expo-speech';

interface RowProps {
  source: string;
  target: string;
  number: number;
}

const Row: React.FC<RowProps> = ({ source, target, number }) => {
  const handleCopyToClipboard = async (text: string) => {
    if (text) await Clipboard.setStringAsync(text);
  };

  const handleSpeak = (text: string, language: 'ja-JP' | 'vi-VN') => {
    if (!text || text.length === 0) {
      return;
    }
    Speech.stop();
    Speech.speak(text, { language });
  };

  return (
    <View className='rounded-lg mb-4 mx-2 mt-1 border-[1px] border-primary overflow-hidden'>
      <Text className='border-b-[1px] border-primary px-2 py-1 text-text'>
        Số {number}
      </Text>
      <View className='p-2'>
        <Text className='text-text' selectable>
          {source}
        </Text>
        <View className='flex-row justify-end gap-4'>
          <TouchableOpacity
            className='p-1'
            onPress={() => handleSpeak(source, 'ja-JP')}>
            <FontAwesome name='volume-up' className='text-[20px] text-text' />
          </TouchableOpacity>
          <TouchableOpacity
            className='p-1'
            onPress={() => handleCopyToClipboard(source)}>
            <FontAwesome6 name='copy' className='text-[20px] text-text' />
          </TouchableOpacity>
        </View>
      </View>
      <View className='bg-primary p-2'>
        <Text className='text-text-button' selectable>
          {target}
        </Text>
        <View className='flex-row justify-end gap-4'>
          <TouchableOpacity
            className='p-1'
            onPress={() => handleSpeak(target, 'vi-VN')}>
            <FontAwesome name='volume-up' className='text-[20px] text-white' />
          </TouchableOpacity>
          <TouchableOpacity
            className='p-1'
            onPress={() => handleCopyToClipboard(target)}>
            <FontAwesome6 name='copy' className='text-[20px] text-white' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Row;
