import { Redirect } from 'expo-router';
const HomePage: React.FC = () => {
  return (
    <>
      <Redirect href="/navigate" />
    </>
  );
};
export default HomePage;
