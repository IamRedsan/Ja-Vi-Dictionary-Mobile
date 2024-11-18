import CommentContainer from '@/components/comment/CommentContainer';
import ListCommentContainer from '@/components/comment/ListCommentContainer';
import { cssInterop } from 'nativewind';
import { View, Text } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

cssInterop(SafeAreaView, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

const tempComment1 = {
  _id: '123',
  user: {
    _id: '123',
    avatar:
      'https://i.pinimg.com/736x/bc/98/2d/bc982dc97bd14da21fbce45114e0fee1.jpg',
    fullname: 'Vo Viet Truong',
  },
  content: `これは非常に長いテキストの例です。日本語で書かれたこのテキストは、コンテンツがどのように表示されるかをテストするために使用されます。 `,
  liked_by: [],
  created_at: '2024-10-20T10:18:08.970Z',
};

const tempComment2 = {
  _id: '124',
  user: {
    _id: '124',
    avatar:
      'https://i.pinimg.com/736x/bc/98/2d/bc982dc97bd14da21fbce45114e0fee1.jpg',
    fullname: 'Nguyen Van A',
  },
  content: `これは別の長いテキストの例です。日本語で書かれたこのテキストも、コンテンツがどのように表示されるかをテストするために使用されます。 `,
  liked_by: [],
  created_at: '2024-10-21T10:18:08.970Z',
};

const tempComment3 = {
  _id: '125',
  user: {
    _id: '125',
    avatar:
      'https://i.pinimg.com/736x/bc/98/2d/bc982dc97bd14da21fbce45114e0fee1.jpg',
    fullname: 'Tran Thi B',
  },
  content: `これはさらに別の長いテキストの例です。日本語で書かれたこのテキストも、コンテンツがどのように表示されるかをテストするために使用されます。 `,
  liked_by: [],
  created_at: '2024-10-22T10:18:08.970Z',
};

const comments = {
  comments: [
    tempComment1,
    tempComment2,
    tempComment3,
    tempComment1,
    tempComment2,
    tempComment3,
  ],
  isKanjiComment: true,
};

const Decks = () => {
  return (
    <View className='bg-secondary-background'>
      <SafeAreaView className='bg-primary-background' />
      {/* <Text>Decks</Text> */}
      <View className='h-full'>
        <ListCommentContainer {...comments} isKanjiComment={true} />
      </View>
    </View>
  );
};
export default Decks;
