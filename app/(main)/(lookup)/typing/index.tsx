import { ScrollView } from 'react-native';
import TypingGuide from '@/components/typing/TypingGuide';
const Typing = () => {
  return (
    <ScrollView className='bg-primary-background'>
      <TypingGuide />
    </ScrollView>
  );
};
export default Typing;
