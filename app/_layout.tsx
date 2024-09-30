import { Stack } from 'expo-router';

import '../global.css';

const RootLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(main)' />
      <Stack.Screen
        name='(auth)'
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  );
};

export default RootLayout;
