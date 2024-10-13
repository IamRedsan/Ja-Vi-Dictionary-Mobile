import axios, { AxiosInstance } from 'axios';
import { useColorScheme } from 'nativewind';
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IUser {
  id: string;
  email: string;
  username: string;
  name: string;
  createdDate: string;
  avatar: string;
  role: 'user' | 'admin';
}

export type AppStateType = {
  user?: IUser;
  client: AxiosInstance;
  authClient?: AxiosInstance;
  theme: ThemeType;
};

export type AppContextType = AppStateType & {
  setTheme: (theme: ThemeType) => Promise<void>;
};

export const AppContext = createContext<AppContextType | null>(null);

export type ThemeType = 'light' | 'dark' | 'system';

const baseURL = '/api/v1';

const initialState: AppStateType = {
  user: undefined,
  client: axios.create({ baseURL: baseURL }),
  authClient: undefined,
  theme: 'light',
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppStateType>(initialState);

  const { setColorScheme } = useColorScheme();

  const setTheme = async (theme: ThemeType) => {
    setState((prev) => ({ ...prev, theme }));
    setColorScheme(theme);
    await AsyncStorage.setItem('theme', theme);
  };

  useEffect(() => {
    const getTheme = async () => {
      const t = ((await AsyncStorage.getItem('theme')) as ThemeType) ?? 'light';
      setState((prev) => ({ ...prev, theme: t }));
      setColorScheme(t);
    };
    getTheme();
  }, []);

  return (
    <AppContext.Provider value={{ ...state, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext) as AppContextType;
};

export default AppProvider;
