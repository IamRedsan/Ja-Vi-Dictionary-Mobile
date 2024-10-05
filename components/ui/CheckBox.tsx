import Checkbox from 'expo-checkbox';
import { useColorScheme } from 'nativewind';

interface CheckBoxProps {
  isCheck: boolean;
  onClick: () => void;
  size?: number;
}

const CheckBox: React.FC<CheckBoxProps> = ({ onClick, isCheck, size = 20 }) => {
  const { colorScheme } = useColorScheme();
  return (
    <>
      <Checkbox
        className={`${isCheck ? ' bg-primary' : ' bg-quaternary'} `}
        color={colorScheme === 'light' ? '#24b6b7' : '#ffbade'}
        value={isCheck}
        style={{ width: size, height: size }}
        onValueChange={() => onClick()}
      />
    </>
  );
};
export default CheckBox;
