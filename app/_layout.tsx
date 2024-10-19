import { Stack } from 'expo-router';

import '../global.css';
import AppProvider from '@/context/appContext';

const RootLayout: React.FC = () => {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_bottom',
        }}>
        <Stack.Screen name='(main)' />
        <Stack.Screen
          name='(auth)'
          options={{
            presentation: 'modal',
          }}
        />
      </Stack>
    </AppProvider>
  );
};

export default RootLayout;
