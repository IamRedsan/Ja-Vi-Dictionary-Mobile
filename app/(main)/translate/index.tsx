import Button from '@/components/ui/Button';
import { Link } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { View, ScrollView } from 'react-native';

const Translate = () => {
  const { toggleColorScheme } = useColorScheme();

  return (
    <ScrollView className="bg-primary-background">
      <Link href="/dictionary/1" asChild>
        <Button>Login</Button>
      </Link>
      <View className="pb-5">
        <Button
          onPress={() => {
            toggleColorScheme();
          }}
        >
          Change Theme
        </Button>
      </View>
    </ScrollView>
  );
};
export default Translate;
