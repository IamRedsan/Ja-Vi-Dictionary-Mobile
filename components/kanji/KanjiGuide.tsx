import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { Kanji } from 'react-native-kanji-animation';
import Button from '../ui/Button';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

interface KanjiGuideProps {
  word: string;
}

const KanjiGuide = forwardRef<any, KanjiGuideProps>(({ word }, ref) => {
  const localKanjiRef = useRef<any>(null);
  const { colorScheme } = useColorScheme();

  useImperativeHandle(ref, () => ({
    animate() {
      if (localKanjiRef.current) {
        localKanjiRef.current.animate();
      }
    },
  }));

  useEffect(() => {
    if (localKanjiRef.current) {
      localKanjiRef.current.animate();
    }
  }, []);

  return (
    <>
      <View className="bg-primary-background mb-2 p-2 rounded-[6px]">
        <Kanji
          ref={localKanjiRef}
          element={word}
          size={90}
          placeholder={true}
          duration={700}
          pathProps={{
            strokeWidth: 6,
            stroke: colorScheme === 'light' ? '#24B6B7' : '#FFBADE',
          }}
          placeholderProps={{
            strokeWidth: 4,
            stroke: colorScheme === 'light' ? '#525356' : '#FEFEFE',
          }}
        />
        {/* <View className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 transform -translate-y-1/2 "></View>
        <View className="absolute left-1/2 top-0 h-full w-0.5 bg-gray-300 transform -translate-x-1/2"></View> */}
      </View>
      <Button
        startIcon="refresh"
        onPress={() => {
          if (localKanjiRef.current) {
            localKanjiRef.current.animate();
          }
        }}
      >
        Vẽ lại
      </Button>
    </>
  );
});

export default KanjiGuide;
