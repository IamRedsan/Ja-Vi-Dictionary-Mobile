import { Stack } from 'expo-router';

const ForgotPasswordLayout: React.FC = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='[token]' />
    </Stack>
  );
};

export default ForgotPasswordLayout;
