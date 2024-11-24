import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CommentContainer from './CommentContainer';
import Pagination from '../ui/Pagination';
import { router } from 'expo-router';
import { useAppContext } from '@/context/appContext';
import OutsidePressHandler from 'react-native-outside-press';
import Ionicons from '@expo/vector-icons/Ionicons';
import { cssInterop, useColorScheme } from 'nativewind';

cssInterop(Ionicons, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

interface ListCommentContainerProps {
  comments: {
    _id: string;
    user: {
      _id: string;
      fullname: string;
      avatar: string;
    };
    content: string;
    liked_by: string[];
    created_at: string;
  }[];
  isKanjiComment: boolean;
}

const COMMENTS_PER_PAGE = 4;

const ListCommentContainer: React.FC<ListCommentContainerProps> = ({
  comments,
  isKanjiComment,
}) => {
  const { colorScheme } = useColorScheme();
  const [curPage, setCurPage] = useState<number>(1);
  const { user: currentUser } = useAppContext();
  const [commentValue, setCommentValue] = useState<string>('');
  const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);
  const paginatedComments = comments.slice(
    (curPage - 1) * COMMENTS_PER_PAGE,
    curPage * COMMENTS_PER_PAGE
  );
  const handleFocusInputText = () => {
    if (currentUser) {
      // Redirect if the user is not logged in
      Keyboard.dismiss(); // Dismiss the keyboard
      router.push('/login'); // Redirect to login
    }
  };

  const handleClickOutside = () => {
    Keyboard.dismiss(); // Dismiss the keyboard when clicking outside
  };

  const handleSendComment = () => {
    if (commentValue.trim()) {
      // Submit the comment here (e.g., call an API)
      setCommentValue(''); // Clear the comment input field
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleClickOutside}>
      <OutsidePressHandler onOutsidePress={handleClickOutside}>
        <View className='h-full my-2'>
          <View className='px-2'>
            {paginatedComments.map((comment) => (
              <CommentContainer
                key={comment._id}
                {...comment}
                isKanjiComment={isKanjiComment}
              />
            ))}
          </View>
          <View>
            <Pagination
              curPage={curPage}
              disabled={comments.length === 0}
              setCurPage={setCurPage}
              totalPages={totalPages}
            />
          </View>
          <View className='flex-row justify-center gap-3 items-center mx-4'>
            <TextInput
              className='bg-primary-search w-[90%] rounded-3xl pt-1 pb-3 pl-4 text-text text-lg'
              placeholder='Thêm nghĩa hoặc ví dụ'
              value={commentValue}
              multiline={true}
              onChangeText={setCommentValue}
              onFocus={handleFocusInputText}
              placeholderTextColor={
                colorScheme === 'light' ? '#525356' : '#fefefe'
              }
            />
            <TouchableOpacity
              onPress={handleSendComment} // Handle the send action
              className='rounded-lg w-10 bg-primary aspect-square items-center justify-center'
              accessible={true}
              accessibilityLabel='Send Comment'>
              <Ionicons name='send' className='text-2xl text-text-button' />
            </TouchableOpacity>
          </View>
        </View>
      </OutsidePressHandler>
    </TouchableWithoutFeedback>
  );
};

export default ListCommentContainer;
