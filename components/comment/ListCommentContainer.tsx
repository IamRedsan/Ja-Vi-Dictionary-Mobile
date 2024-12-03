import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import CommentContainer from './CommentContainer';
import Pagination from '../ui/Pagination';
import { router } from 'expo-router';
import { useAppContext } from '@/context/appContext';
import OutsidePressHandler from 'react-native-outside-press';
import Ionicons from '@expo/vector-icons/Ionicons';
import { cssInterop, useColorScheme } from 'nativewind';
import { authClient } from '@/client/axiosClient';
import Toast from 'react-native-toast-message';
import { AxiosError } from 'axios';

cssInterop(Ionicons, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

const COMMENTS_PER_PAGE = 4;

interface Comment {
  _id: string;
  user: {
    _id: string;
    fullname: string;
    avatar: string | undefined;
  };
  content: string;
  liked_by: string[];
  created_at: string;
}

interface ListCommentContainerProps {
  initialComments: Comment[];
  isKanjiComment: boolean;
  mainItemId: string;
}

const ListCommentContainer: React.FC<ListCommentContainerProps> = ({
  initialComments = [],
  isKanjiComment,
  mainItemId,
}) => {
  const [curPage, setCurPage] = useState<number>(1);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(initialComments.length / COMMENTS_PER_PAGE)
  );
  const [paginatedComments, setPaginatedComments] = useState<Comment[]>(
    initialComments.slice(0, COMMENTS_PER_PAGE)
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingCommentId, setLoadingCommentId] = useState<string | null>(null);
  const [commentValue, setCommentValue] = useState<string>('');
  const { colorScheme } = useColorScheme();
  const { user: currentUser } = useAppContext();
  const [isCommentable, setIsCommentable] = useState<boolean>(!!currentUser);
  const inputRef = useRef<TextInput>(null);

  const handleSendComment = async () => {
    try {
      setCommentValue('');
      if (commentValue.trim()) {
        let param;
        if (isKanjiComment) {
          param = { kanjiId: mainItemId };
        } else {
          param = { wordId: mainItemId };
        }
        const response = await authClient.post(
          'comments/',
          {
            content: commentValue,
          },
          {
            params: param,
          }
        );
        let newComment: Comment = response.data.data;
        newComment.user = {
          _id: currentUser!._id,
          avatar: currentUser!.avatar,
          fullname: currentUser!.fullname,
        };

        const updatedComments = [newComment, ...comments];
        setComments(updatedComments);
      } else {
        Toast.show({
          type: 'info',
          text1: 'Dữ liệu nhập không chính xác',
          text2: 'Hãy nhập chuỗi có giá trị!',
          autoHide: true,
        });
      }
    } catch (err) {
      const e = err as AxiosError;
      const message = (e.response?.data as any)?.message as any;
      Toast.show({
        type: 'error',
        text1: 'Đã có lỗi xảy ra',
        text2: message ?? 'Lỗi không xác định',
        autoHide: true,
      });
    } finally {
    }
  };

  const handlePressInputText = () => {
    if (!currentUser) {
      router.push('/login');
    } else {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 200);
    }
  };

  useEffect(() => {
    setTotalPages(Math.ceil(comments.length / COMMENTS_PER_PAGE));
  }, [comments]);

  useEffect(() => {
    const startIndex = (curPage - 1) * COMMENTS_PER_PAGE;
    const endIndex = startIndex + COMMENTS_PER_PAGE;

    const showComments = comments.slice(startIndex, endIndex);
    setPaginatedComments(showComments);
  }, [curPage, comments]);

  useEffect(() => {
    if (!currentUser) setIsCommentable(false);
    else setIsCommentable(true);
  }, [currentUser]);

  const handleClickOutside = () => {
    Keyboard.dismiss();
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleDeleteComment = async (_id: string) => {
    try {
      setIsLoading(true);
      setLoadingCommentId(_id);
      let param;
      if (isKanjiComment) {
        param = { commentId: _id, kanjiId: mainItemId };
      } else {
        param = { commentId: _id, wordId: mainItemId };
      }
      const response = await authClient.delete('/comments', {
        params: param,
      });
      if (response.status === 200) {
        const updatedComments = comments.filter(
          (comment) => comment._id !== _id
        );
        setComments(updatedComments);
      }
    } catch (error) {
      const e = error as AxiosError;
      const message = (e.response?.data as any)?.message as any;
      Toast.show({
        type: 'error',
        text1: 'Đã có lỗi xảy ra',
        text2: message ?? 'Lỗi không xác định',
        autoHide: true,
      });
    } finally {
      setIsLoading(false);
      setLoadingCommentId(null);
    }
  };

  const handleEditComment = async (_id: string, updatedContent: string) => {
    try {
      setIsLoading(true);
      setLoadingCommentId(_id);
      let param;
      if (isKanjiComment) {
        param = { commentId: _id, kanjiId: mainItemId };
      } else {
        param = { commentId: _id, wordId: mainItemId };
      }
      const response = await authClient.put(
        '/comments',
        {
          content: updatedContent,
        },
        {
          params: param,
        }
      );
      let editedComment: Comment = response.data.data;
      editedComment.user = {
        _id: currentUser!._id,
        avatar: currentUser!.avatar,
        fullname: currentUser!.fullname,
      };
      const updatedComments = comments.map((comment) =>
        comment._id === _id ? { ...editedComment } : comment
      );
      setComments(updatedComments);
    } catch (error) {
      const e = error as AxiosError;
      const message = (e.response?.data as any)?.message as any;
      Toast.show({
        type: 'error',
        text1: 'Đã có lỗi xảy ra',
        text2: message ?? 'Lỗi không xác định',
        autoHide: true,
      });
    } finally {
      setIsLoading(false);
      setLoadingCommentId(null);
    }
  };

  const handleLiked = async (_id: string) => {
    if (!currentUser) {
      router.push('/login');
    } else {
      let param;
      if (isKanjiComment) {
        param = { kanjiId: mainItemId, commentId: _id };
      } else {
        param = { wordId: mainItemId, commentId: _id };
      }

      const comment = comments.find((comment) => comment._id === _id);
      if (!comment) return;

      const isLiked = comment.liked_by.includes(currentUser._id);

      const updatedComments = comments.map((comment) =>
        comment._id === _id
          ? {
              ...comment,
              liked_by: isLiked
                ? comment.liked_by.filter((id) => id !== currentUser._id)
                : [...comment.liked_by, currentUser._id],
            }
          : comment
      );
      setComments(updatedComments);

      try {
        await authClient.post('/comments/like', null, { params: param });
      } catch (error) {
        const revertComments = comments.map((comment) =>
          comment._id === _id
            ? {
                ...comment,
                liked_by: isLiked
                  ? [...comment.liked_by, currentUser._id]
                  : comment.liked_by.filter((id) => id !== currentUser._id),
              }
            : comment
        );
        setComments(revertComments);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleClickOutside}>
      <OutsidePressHandler onOutsidePress={handleClickOutside}>
        <View className='my-2'>
          <View className='px-2'>
            <View className='flex-row justify-center gap-3 items-center mx-4'>
              <TextInput
                ref={inputRef}
                className='bg-primary-search w-[90%] rounded-3xl pt-1 pb-3 pl-4 text-text text-lg'
                placeholder='Thêm nghĩa hoặc ví dụ'
                value={commentValue}
                editable={isCommentable}
                multiline={true}
                onChangeText={setCommentValue}
                onPress={handlePressInputText}
                placeholderTextColor={
                  colorScheme === 'light' ? '#525356' : '#fefefe'
                }
                scrollEnabled={false}
              />
              <TouchableOpacity
                onPress={handleSendComment}
                disabled={!isCommentable}
                className='rounded-lg w-10 bg-primary aspect-square items-center justify-center'
                accessible
                accessibilityLabel='Send Comment'>
                <Ionicons name='send' size={24} color='#FFF' />
              </TouchableOpacity>
            </View>
            {comments.length === 0 ? (
              <View>
                <Text className='text-text text-center my-4'>
                  Không có bình luận
                </Text>
              </View>
            ) : (
              paginatedComments.map((comment, index) => (
                <CommentContainer
                  key={index}
                  {...comment}
                  handleDeleteComment={handleDeleteComment}
                  handleEditComment={handleEditComment}
                  handleLiked={handleLiked}
                  isLoading={isLoading && loadingCommentId === comment._id}
                />
              ))
            )}
          </View>
          <Pagination
            curPage={curPage}
            disabled={false}
            setCurPage={setCurPage}
            totalPages={totalPages}
          />
        </View>
      </OutsidePressHandler>
    </TouchableWithoutFeedback>
  );
};

export default ListCommentContainer;
