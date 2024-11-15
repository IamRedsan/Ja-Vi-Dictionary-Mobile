import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const baseURL = `${process.env.EXPO_PUBLIC_SERVER_URL}`;
export const AIBaseURL = `${process.env.EXPO_PUBLIC_AI_URL}`;

export const authClient = axios.create({
  baseURL: `${baseURL}/api/v1`,
});

authClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        const expiredAccessToken = await SecureStore.getItemAsync(
          'accessToken'
        );

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(
          '/auth/refresh',
          {
            refresh_token: refreshToken,
          },
          { headers: { Authorization: `Bearer ${expiredAccessToken}` } }
        );

        const newAccessToken = response.data.accessToken;
        await SecureStore.setItemAsync('accessToken', newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return authClient(originalRequest);
      } catch (refreshError) {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
      }
    }

    return Promise.reject(error);
  }
);

export const client = axios.create({ baseURL: `${baseURL}/api/v1` });

export const aiClient = axios.create({ baseURL: `${AIBaseURL}/api/v1` });
