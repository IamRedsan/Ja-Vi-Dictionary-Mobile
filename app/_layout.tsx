import { Stack } from 'expo-router';
import '../global.css';
import AppProvider from '@/context/appContext';
import Toast from 'react-native-toast-message';
import { EventProvider } from 'react-native-outside-press';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import AnkiProvider from '@/context/ankiContext';

SplashScreen.preventAutoHideAsync();

const RootLayout: React.FC = () => {
  const [loaded, error] = useFonts({
    'UTM-Father': require('./../assets/fonts/UTM-Father.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <AppProvider>
        <AnkiProvider>
          <EventProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name='(main)' />
              <Stack.Screen
                name='(auth)'
                options={{
                  animationTypeForReplace: 'push',
                  animation: 'slide_from_bottom',
                }}
              />
            </Stack>
          </EventProvider>
        </AnkiProvider>
      </AppProvider>
      <Toast />
    </>
  );
};

export default RootLayout;
