import LottieView from 'lottie-react-native';
import circleSpin from '../../assets/loadings/CircelSpin.json';
import { useColorScheme } from 'nativewind';

export default function CircleSpin() {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === 'dark' ? '#ffbade' : '#24b6b7';

  return (
    <LottieView
      source={circleSpin}
      autoPlay
      loop
      colorFilters={[
        { keypath: 'Shape Layer 3', color },
        { keypath: 'Shape Layer 2', color },
        { keypath: 'Shape Layer 1', color },
      ]}
      style={{ height: '100%', width: '60%', alignSelf: 'center' }}
    />
  );
}
