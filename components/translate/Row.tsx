import { View, Text } from 'react-native';

interface RowProps {
  source: string;
  target: string;
}

const Row: React.FC<RowProps> = ({ source, target }) => {
  return (
    <View className='rounded-lg mb-4 mx-2 mt-1 border-[1px] border-primary overflow-hidden'>
      <Text className='border-b-[1px] border-primary px-2 py-1 text-text'>
        Văn bản gốc và văn bản dịch
      </Text>
      <View className='p-2'>
        <Text className='text-text' selectable>
          {source}
        </Text>
      </View>
      <View className='bg-primary p-2'>
        <Text className='text-text-button' selectable>
          {target}
        </Text>
      </View>
    </View>
  );
};
export default Row;
