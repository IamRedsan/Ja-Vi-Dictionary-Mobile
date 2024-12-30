import { Stack } from 'expo-router';
import '../global.css';
import AppProvider from '@/context/appContext';
import Toast from 'react-native-toast-message';
import { EventProvider } from 'react-native-outside-press';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { Suspense, useEffect } from 'react';
import AnkiProvider from '@/context/ankiContext';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { View } from 'react-native';
import { createTablesQuery, deleteTablesQuery } from '@/constants/Query';
import TranslateProvider from '@/context/translateContext';
import AnkiSyncProvider from '@/context/ankiSyncContext';

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
    <React.Fragment>
      <AppProvider>
        <Suspense fallback={<View />}>
          <SQLiteProvider
            databaseName='anki.dbtest'
            onInit={initDb}
            useSuspense>
            <AnkiProvider>
              <AnkiSyncProvider>
                <TranslateProvider>
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
                </TranslateProvider>
              </AnkiSyncProvider>
            </AnkiProvider>
          </SQLiteProvider>
        </Suspense>
      </AppProvider>
      <Toast />
    </React.Fragment>
  );
};

const initDb = async (db: SQLiteDatabase) => {
  // await db.execAsync(deleteTablesQuery);
  await db.execAsync(createTablesQuery);
};

export default RootLayout;
