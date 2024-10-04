import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  SkeletonContainer,
  GradientProps,
} from 'react-native-dynamic-skeletons';
import { useColorScheme } from 'nativewind';
const Gradient = (props: GradientProps) => <LinearGradient {...props} />;

interface LoadingProps {
  width: number;
  height: number;
  borderRadius: number;
}

const Loading: React.FC<LoadingProps> = ({ borderRadius, height, width }) => {
  const { colorScheme } = useColorScheme();
  const color: [string, string, string] =
    colorScheme === 'light'
      ? ['#e1e1e1', '#f2f2f2', '#e1e1e1']
      : ['#32304a', '#403d58', '#4e4b67'];
  return (
    <SkeletonContainer
      isLoading={true}
      Gradient={Gradient}
      colors={color}
      style={{
        backgroundColor: colorScheme === 'light' ? '#e1e1e1' : '#32304a',
      }}
    >
      <View
        style={{
          height: height,
          width: width,
          borderRadius: borderRadius,
        }}
      ></View>
    </SkeletonContainer>
  );
};
export default Loading;
