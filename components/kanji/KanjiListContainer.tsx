import { useState } from 'react';
import { View, Text } from 'react-native';
import CheckBox from '../ui/CheckBox';
import PickerSelect from '../ui/PickerSelect';
import { jlptLevelEnum, jlptPlaceHolder } from '../../constants/jlptLevelEnum';

const KanjiListContainer: React.FC = () => {
  const [showText, setShowText] = useState<boolean>(true);
  const [showPhonetic, setShowPhonetic] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [jlptLevel, setJlptLevel] = useState<string>('5');

  const handleChangeKanjiListLevel = async (level: string) => {};

  return (
    <View className="bg-primary-background mt-4 justify-center items-center gap-2 h-full">
      <CheckBox
        isCheck={showText}
        onClick={() => {
          setShowText(!showText);
        }}
      />

      <PickerSelect
        value={jlptLevel}
        items={jlptLevelEnum}
        setValue={(value) => setJlptLevel(value)}
        callAPI={handleChangeKanjiListLevel}
      />
    </View>
  );
};
export default KanjiListContainer;
