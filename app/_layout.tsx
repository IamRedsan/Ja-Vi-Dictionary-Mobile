import { Stack } from 'expo-router';

import '../global.css';
import AppProvider from '@/context/appContext';
import Toast from 'react-native-toast-message';

const RootLayout: React.FC = () => {
  return (
    <>
      <AppProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name='(main)' />
          <Stack.Screen
            name='(auth)'
            options={{
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_bottom',
            }}
          />
        </Stack>
      </AppProvider>
      <Toast />
    </>
  );
};

export default RootLayout;
