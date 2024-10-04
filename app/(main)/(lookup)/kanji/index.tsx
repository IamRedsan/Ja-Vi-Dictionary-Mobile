import Button from '@/components/ui/Button';
import { Link } from 'expo-router';
import { View, Text } from 'react-native';
const Kanji = () => {
  return (
    <Link href="/kanji/1" asChild>
      <Button>Hello</Button>
    </Link>
  );
};
export default Kanji;
