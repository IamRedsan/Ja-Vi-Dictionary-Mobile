import { Redirect } from 'expo-router';
import { View, Text } from 'react-native';
const HomePage: React.FC = () => {
  return (
    <Redirect href='/alphabet'/>
  );
};
export default HomePage;
