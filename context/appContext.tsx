import axios, { AxiosInstance } from 'axios';
import { useColorScheme } from 'nativewind';
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { authClient } from '@/client/axiosClient';

interface IUser {
  _id: string;
  email: string;
  username: string;
  fullname: string;
  avatar?: string;
  role: 'user' | 'admin';
}

export type AppStateType = {
  user?: IUser;
  theme: ThemeType;
};

export type AppContextType = AppStateType & {
  setTheme: (theme: ThemeType) => Promise<void>;
  setUser: (
    user: IUser,
    accessToken: string,
    refreshToken: string
  ) => Promise<void>;
  updateUser: (user: IUser) => void;
  removeUser: () => Promise<void>;
};

export const AppContext = createContext<AppContextType | null>(null);

export type ThemeType = 'light' | 'dark' | 'system';

const initialState: AppStateType = {
  user: undefined,
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

  const setUser = async (
    user: IUser,
    accessToken: string,
    refreshToken: string
  ) => {
    setState((prev) => ({
      ...prev,
      user,
    }));

    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
  };

  const updateUser = (user: IUser) => {
    setState((prev) => ({
      ...prev,
      user,
    }));
  };

  const removeUser = async () => {
    setState((prev) => ({ ...prev, user: undefined }));

    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
  };

  useEffect(() => {
    const getTheme = async () => {
      const t = ((await AsyncStorage.getItem('theme')) as ThemeType) ?? 'light';
      setState((prev) => ({ ...prev, theme: t }));
      setColorScheme(t);
    };
    getTheme();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      if (!(await SecureStore.getItemAsync('accessToken'))) {
        return;
      }

      try {
        const response = await authClient.get('auth/get-info');
        const user = response.data.data;

        setState((prev) => ({
          ...prev,
          user,
        }));
      } catch (err) {
        console.log(err);
        removeUser();
      }
    };
    getUser();
  }, []);

  return (
    <AppContext.Provider
      value={{ ...state, setTheme, setUser, removeUser, updateUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext) as AppContextType;
};

export default AppProvider;
