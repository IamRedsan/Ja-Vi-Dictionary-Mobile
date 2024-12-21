import { PiechartData, useAnkiContext } from '@/context/ankiContext';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PieChart as Pie } from 'react-native-chart-kit';
const PieChart: React.FC = () => {
  const windowWidth = Dimensions.get('window').width;
  const { getPiechartData, curDeckId } = useAnkiContext();
  const [data, setData] = useState<PiechartData[]>([]);
  const { colorScheme } = useColorScheme();
  useEffect(() => {
    const getData = async (deckId: number) => {
      const data = await getPiechartData(deckId);
      const textColor = colorScheme === 'light' ? '#24b6b7' : '#ffbade';
      setData(
        data.map((item) => ({
          ...item,
          legendFontColor: textColor,
        })) ?? []
      );
    };
    getData(curDeckId!);
  }, [curDeckId, colorScheme]);
  return (
    <View className='bg-secondary-background rounded-xl p-2 gap-1'>
      <View>
        <Text className='text-primary font-semibold text-2xl m-2'>
          Tổng quan bộ thẻ
        </Text>
      </View>
      <Pie
        data={data}
        width={windowWidth - 40}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor='population'
        backgroundColor={colorScheme === 'light' ? '#ffffff' : '#2d2b44'}
        paddingLeft='15'
      />
      <View className='flex-row justify-between'>
        {data.map((item, index) => (
          <View key={index}>
            <Text
              className='text-primary text-sm'
              style={{ color: item.color }}>
              {item.name}: {item.population}
            </Text>
          </View>
        ))}
      </View>
      <Text className='text-primary text-center mt-2'>
        Tổng cộng: {data.reduce((total, item) => total + item.population, 0)}
      </Text>
    </View>
  );
};
export default PieChart;
