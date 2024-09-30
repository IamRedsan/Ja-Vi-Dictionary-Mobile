import { Stack } from 'expo-router';

const AuthLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name='login' />
      <Stack.Screen name='register' />
      <Stack.Screen name='forgot-password' />
    </Stack>
  );
};

export default AuthLayout;
