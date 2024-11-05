import { Stack } from 'expo-router';
import '../global.css';
import AppProvider from '@/context/appContext';
import Toast from 'react-native-toast-message';
import { EventProvider } from 'react-native-outside-press';

const RootLayout: React.FC = () => {
  return (
    <>
      <AppProvider>
        <EventProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name='(main)' />
            <Stack.Screen
              name='(auth)'
              options={{
                // presentation: '',
                animationTypeForReplace: 'push',
                animation: 'slide_from_bottom',
              }}
            />
          </Stack>
        </EventProvider>
      </AppProvider>
      <Toast />
    </>
  );
};

export default RootLayout;
