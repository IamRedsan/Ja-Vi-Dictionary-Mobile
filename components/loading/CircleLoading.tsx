import { View, ActivityIndicator } from 'react-native';

interface CircleLoadingProps {
  size?: 'large' | 'small';
}

const CircleLoading: React.FC<CircleLoadingProps> = ({ size }) => {
  return (
    <View>
      <ActivityIndicator
        className={`color-primary ${size ? 'size-' + size : ''}`}
      />
    </View>
  );
};
export default CircleLoading;
