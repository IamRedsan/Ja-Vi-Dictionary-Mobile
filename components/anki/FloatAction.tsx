import {
  View,
  Text,
  Animated,
  StyleSheet,
  useAnimatedValue,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { cssInterop, useColorScheme } from 'nativewind';
import { useState } from 'react';
import { useRouter } from 'expo-router';

cssInterop(FontAwesome, {
  className: {
    target: 'style',
    nativeStyleToProp: { size: true },
  } as any,
});

const actionAnimate = {
  scale: 0.9,
  translateY: 100,
  opacity: 0,
};

const FloatAction = () => {
  const buttonScale = useAnimatedValue(1);
  const actionsScale = useAnimatedValue(actionAnimate.scale);
  const actionsTranslateY = useAnimatedValue(actionAnimate.translateY);
  const actionsOpacity = useAnimatedValue(actionAnimate.opacity);
  const [isShow, setIsShow] = useState<boolean>(false);
  const { colorScheme } = useColorScheme();
  const router = useRouter();

  const handlePressIn = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]),
      Animated.timing(actionsTranslateY, {
        toValue: isShow ? actionAnimate.translateY : 0,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(actionsScale, {
        toValue: isShow ? actionAnimate.scale : 1,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(actionsOpacity, {
        toValue: isShow ? actionAnimate.opacity : 1,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setIsShow((prev) => !prev);
      }
    });
  };

  return (
    <View className='absolute right-0 bottom-0 items-end p-4'>
      <Animated.View
        style={[
          styles.actions,
          {
            transform: [
              { scale: actionsScale },
              {
                translateY: actionsTranslateY,
              },
              { perspective: 1000 },
            ],
            opacity: actionsOpacity,
          },
        ]}>
        <TouchableOpacity
          className='flex-row items-center gap-4'
          onPress={() => router.push('/(main)/(anki)/create-deck')}>
          <Text className='text-text'>Tạo bộ thẻ</Text>
          <View className='w-[40px] h-[40px] justify-center items-center bg-primary rounded-full'>
            <FontAwesome name='plus' className='text-[24px] text-text-button' />
          </View>
        </TouchableOpacity>
      </Animated.View>
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <Animated.View
          style={[
            styles.button,
            {
              backgroundColor: colorScheme === 'light' ? '#24b6b7' : '#ffbade',
            },
            { transform: [{ scale: buttonScale }] },
          ]}>
          <FontAwesome name='plus' className='text-[24px] text-text-button' />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    width: 57,
    height: 57,
    transformOrigin: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    transformOrigin: 'right',
    zIndex: 0,
    alignItems: 'flex-end',
    gap: 16,
    paddingRight: 4,
    paddingBottom: 16,
  },
});

export default FloatAction;
