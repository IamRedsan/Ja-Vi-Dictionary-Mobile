import { View, Dimensions } from 'react-native';
import Loading from '../ui/Loading';

const { width } = Dimensions.get('window');
export const WordLoading: React.FC = () => {
  return (
    <View className="flex-1 flex-col m-4 bg-secondary-background">
      <View className="mb-2">
        <Loading height={36} width={80} borderRadius={10}></Loading>
      </View>
      <View className="mb-2">
        <Loading height={70} width={120} borderRadius={10}></Loading>
      </View>
      <View className="mb-2">
        <Loading height={52} width={width - 90} borderRadius={10}></Loading>
      </View>
      <View>
        <Loading height={52} width={width - 120} borderRadius={10}></Loading>
      </View>
    </View>
  );
};

export const ItemLoading: React.FC = () => {
  return (
    <>
      <View className="m-2">
        <Loading height={60} width={width * 0.9} borderRadius={10}></Loading>
      </View>
      <View className="m-2">
        <Loading height={60} width={width * 0.9} borderRadius={10}></Loading>
      </View>
    </>
  );
};
