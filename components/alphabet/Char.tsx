import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import KanjiGuide from '../kanji/KanjiGuide';
import { useColorScheme } from 'nativewind';

type CharProps = {
  content?: string;
  romaji?: string;
};

const Char: React.FC<CharProps> = ({ content, romaji }) => {
  const kanjiExample = useRef<any[]>([]);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string[]>([]);

  const { colorScheme } = useColorScheme();

  if (!content) {
    return <View className='flex-1'></View>;
  }

  return (
    <View className='flex-1'>
      <TouchableOpacity
        className='rounded-[6px] border-[rgba(0,0,0,1)] border-[0.2px] min-h-[80px] justify-center pb-1'
        onPress={() => {
          setModalContent(content.split(''));
          setShowModal(true);
        }}
      >
        <View className='items-center'>
          <Text className='text-text text-[30px] font-semibold'>{content}</Text>
          <Text className='text-text mt-1 text-[16px]'>{romaji}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType='fade'
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View className='flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]'>
            <TouchableWithoutFeedback>
              <View className='flex-row w-[80%] bg-secondary-background p-8 rounded-[10px]'>
                <TouchableOpacity
                  className='absolute top-2.5 right-2.5'
                  onPress={() => setShowModal(false)}
                >
                  <AntDesign
                    name='closecircle'
                    size={24}
                    color={colorScheme === 'light' ? '#343A40' : '#FFBADE'}
                  />
                </TouchableOpacity>
                {modalContent.map((word, index) => (
                  <View
                    key={index}
                    className='flex-1 w-full relative items-center'
                  >
                    <KanjiGuide
                      ref={(el) => (kanjiExample.current[index] = el)}
                      word={word}
                      size={90}
                    />
                  </View>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Char;
