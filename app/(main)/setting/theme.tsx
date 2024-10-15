import { useAppContext } from '@/context/appContext';
import { useColorScheme } from 'nativewind';
import { useMemo } from 'react';
import { ScrollView } from 'react-native';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';

const Theme = () => {
  const { theme, setTheme } = useAppContext();

  const { colorScheme } = useColorScheme();

  const themes: RadioButtonProps[] = useMemo(
    () => [
      {
        id: 'light',
        label: 'Sáng',
        value: 'light',
        color: colorScheme === 'light' ? '#24b6b7' : '#ffbade',
      },
      {
        id: 'dark',
        label: 'Tối',
        value: 'dark',
        color: colorScheme === 'light' ? '#24b6b7' : '#ffbade',
      },
      {
        id: 'system',
        label: 'Hệ thống',
        value: 'system',
        color: colorScheme === 'light' ? '#24b6b7' : '#ffbade',
      },
    ],
    [colorScheme]
  );

  return (
    <ScrollView className='bg-primary-background flex-1 pt-4'>
      <RadioGroup
        radioButtons={themes}
        onPress={setTheme as any}
        selectedId={theme}
        labelStyle={{
          color: colorScheme === 'light' ? '#000000' : '#ffffff',
          fontSize: 16,
          flexGrow: 1,
        }}
        containerStyle={{ alignItems: 'flex-start', rowGap: 16 }}
      />
    </ScrollView>
  );
};
export default Theme;
