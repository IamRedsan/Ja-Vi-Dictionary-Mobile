import { View } from 'react-native';
import Loading from '../ui/Loading';
const CommentLoading = () => {
  return (
    <View className='flex-1 flex-col gap-4 mt-2 px-2'>
      <View className=' flex-row gap-3'>
        <Loading borderRadius={9999} height={48} width={48} />
        <Loading borderRadius={10} height={100} width={300} />
      </View>
      <View className=' flex-row gap-3'>
        <Loading borderRadius={9999} height={48} width={48} />
        <Loading borderRadius={10} height={50} width={300} />
      </View>
      <View className=' flex-row gap-3'>
        <Loading borderRadius={9999} height={48} width={48} />
        <Loading borderRadius={10} height={70} width={300} />
      </View>
      <View className=' flex-row gap-3'>
        <Loading borderRadius={9999} height={48} width={48} />
        <Loading borderRadius={10} height={50} width={300} />
      </View>
    </View>
  );
};
export default CommentLoading;
