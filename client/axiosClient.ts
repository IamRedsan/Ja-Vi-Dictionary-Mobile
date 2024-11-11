import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const baseURL = 'http://192.168.1.4:4000/api/v1';

export const authClient = axios.create({
  baseURL,
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

export const client = axios.create({ baseURL });
