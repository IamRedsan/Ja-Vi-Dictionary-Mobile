import LottieView from 'lottie-react-native';
import earthLoading from '../../assets/loadings/EarthLoading.json';
import { useColorScheme } from 'nativewind';

export default function EarthLoading() {
  const { colorScheme } = useColorScheme();
  const colorDot = colorScheme === 'dark' ? '#ffbade' : '#24b6b7';
  const colorLine = colorScheme === 'dark' ? '#ffffff' : '#000000';

  return (
    <LottieView
      source={earthLoading}
      autoPlay
      loop
      style={{ height: '100%', width: '100%' }}
      colorFilters={[
        { keypath: 'dot-red', color: colorDot },
        { keypath: 'globe Outlines', color: colorLine },
        { keypath: 'globe Outlines 2', color: colorLine },
      ]}
      cacheComposition={false}
    />
  );
}
