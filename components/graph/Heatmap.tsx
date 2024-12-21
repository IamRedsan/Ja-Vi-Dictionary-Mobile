import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
import { formatDateToString } from '@/utils/dateFormatUtil';
import { HeatmapData, useAnkiContext } from '@/context/ankiContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import { cssInterop, useColorScheme } from 'nativewind';

cssInterop(AntDesign, {
  className: {
    target: 'style',
    nativeStyleToProp: { size: true },
  } as any,
});

const Heatmap: React.FC = () => {
  const windowWidth = Dimensions.get('window').width;
  const { colorScheme } = useColorScheme();
  const chosenColors = colors[colorScheme ?? 'light'];
  const { getHeatmapData, curDeckId } = useAnkiContext();
  const [data, setData] = useState<HeatmapData[]>([]);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [endDay, setEndDay] = useState<Date>(new Date());
  const [dataModal, setDataModal] = useState<{
    date: Date;
    count: number;
  } | null>(null);
  const handleToolTip: any = {};

  const handleCancel = () => {
    setIsShowModal(false);
  };

  useEffect(() => {
    const getData = async (deckId: number) => {
      const commitsData = await getHeatmapData(deckId);
      setData(commitsData ?? []);
    };
    getData(curDeckId!);
  }, [curDeckId]);

  return (
    <View className='bg-secondary-background rounded-xl py-2'>
      <View className='flex-row items-center justify-between'>
        <Text className='text-primary font-semibold text-2xl m-2'>
          Lịch trình học
        </Text>
        <Text className='text-primary text-sm mr-2'>
          {`${formatDateToString(
            new Date(endDay.getTime() - 112 * 24 * 60 * 60 * 1000)
          )}  ${formatDateToString(endDay)}`}
        </Text>
      </View>
      <ContributionGraph
        values={data}
        endDate={endDay}
        numDays={112}
        width={windowWidth}
        height={220}
        squareSize={16}
        gutterSize={2}
        chartConfig={{
          backgroundGradientFrom: chosenColors.background,
          backgroundGradientTo: chosenColors.background,
          backgroundGradientToOpacity: 0.3,
          color: (opacity = 1) => `${chosenColors.squareColor}${opacity})`,
        }}
        tooltipDataAttrs={(value) => handleToolTip}
        onDayPress={({ date, count }) => {
          setDataModal({ date, count });
          setIsShowModal(true);
        }}
        showOutOfRangeDays={false}
      />
      <View className='flex-row gap-2 items-center justify-center'>
        <TouchableOpacity
          className='disabled:opacity-15'
          onPress={() => {
            setIndex(index - 1);
            setEndDay(new Date(endDay.setDate(endDay.getDate() - 112)));
          }}>
          <AntDesign name='caretleft' className='text-3xl text-primary' />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={index >= 0}
          onPress={() => {
            setIndex(index + 1);
            setEndDay(new Date(endDay.setDate(endDay.getDate() + 112)));
          }}
          className='disabled:opacity-15'>
          <AntDesign name='caretright' className='text-3xl text-primary' />
        </TouchableOpacity>
      </View>
      {dataModal && (
        <Modal
          visible={isShowModal}
          transparent
          animationType='fade'
          onRequestClose={handleCancel}>
          <TouchableWithoutFeedback onPress={handleCancel}>
            <View className='flex-1 bg-black/50 justify-center items-center'>
              <TouchableWithoutFeedback>
                <View className='bg-primary-foreground rounded-lg p-6 w-4/5'>
                  <Text className='text-lg font-semibold text-center mb-4 text-primary'>
                    {formatDateToString(dataModal.date!)}
                  </Text>
                  <Text className='text-base text-text text-center mb-4'>
                    {`Số thẻ học: ${dataModal.count}`}
                  </Text>
                  <Text
                    className='text-center text-primary font-medium'
                    onPress={handleCancel}>
                    Đóng
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

export default Heatmap;

const colors = {
  light: {
    background: '#ffffff',
    squareColor: 'rgba(36, 182, 183, ',
  },
  dark: {
    background: '#2d2b44',
    squareColor: 'rgba(255, 186, 222, ',
  },
};
