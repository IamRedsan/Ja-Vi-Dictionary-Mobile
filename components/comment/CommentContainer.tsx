import { useAppContext } from '@/context/appContext';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from 'react-native';
import { Image } from 'expo-image';
import { dateFormat } from '@/utils/dateFormatUtil';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { cssInterop } from 'nativewind';
import { useState, useEffect, useRef } from 'react';
import CircleLoading from '../loading/CircleLoading';

cssInterop(AntDesign, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

cssInterop(Entypo, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

interface CommentContainerProps {
  _id: string;
  user: {
    _id: string;
    fullname: string;
    avatar: string | undefined;
  };
  content: string;
  liked_by: string[];
  created_at: string;
  handleDeleteComment: (_id: string) => Promise<void>;
  handleEditComment: (_id: string, updatedContent: string) => Promise<void>;
  handleLiked: (_id: string) => void;
  isLoading: boolean;
}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const CommentContainer: React.FC<CommentContainerProps> = ({
  _id,
  user,
  content,
  created_at,
  liked_by = [],
  handleDeleteComment,
  handleEditComment,
  handleLiked,
  isLoading,
}) => {
  const { user: currentUser } = useAppContext();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [commentTitle, setCommentTitle] = useState<string>(content);
  const [commentValue, setCommentValue] = useState<string>(content);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (currentUser) {
      setIsLiked(
        Array.isArray(liked_by) &&
          liked_by.some((likedUserId) => likedUserId === currentUser._id)
      );
    } else {
      setIsLiked(false);
    }
  }, [currentUser, liked_by]);

  const handleEdit = () => {
    setIsOptionsVisible(false);
    setIsEditable(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 300);
  };

  const handleClickOutside = () => {
    Keyboard.dismiss();
    setIsOptionsVisible(false);
    setCommentTitle(commentValue);
    if (inputRef.current) {
      inputRef.current.blur();
    }
    setIsEditable(false);
  };

  useEffect(() => {
    setCommentTitle(content);
    setCommentValue(content);
  }, [content]);

  return (
    <TouchableWithoutFeedback onPress={handleClickOutside}>
      <View className='flex-row justify-center flex-wrap my-2'>
        <View>
          <Image
            source={
              user.avatar ?? require('../../assets/images/F_ac1CoXAAA3nxs.jpg')
            }
            placeholder={{ blurhash }}
            transition={1000}
            className='w-12 h-12 bg-[#0553] rounded-full aspect-square'
          />
        </View>
        <View className='relative flex-col ml-1 w-[85%] bg-primary-background p-2 rounded-xl'>
          <View className='flex-row items-center justify-between'>
            <Text className='text-primary font-bold'>{user.fullname}</Text>
            <View className='flex-row gap-2'>
              {isLoading && <CircleLoading size='small' />}
              {currentUser?._id === user._id && (
                <TouchableOpacity
                  onPress={() => {
                    setIsOptionsVisible(!isOptionsVisible);
                  }}>
                  {isEditable ? (
                    <View className='flex-row gap-2'>
                      <AntDesign
                        name='close'
                        className='text-xl text-[#ff3b3e]'
                        onPress={() => {
                          setCommentTitle(commentValue);
                          setIsEditable(false);
                        }}
                      />
                      <AntDesign
                        name='check'
                        className='text-xl text-primary'
                        onPress={() => {
                          handleEditComment(_id, commentTitle);
                          setIsEditable(false);
                        }}
                      />
                    </View>
                  ) : (
                    <Entypo
                      name='dots-three-horizontal'
                      className='text-xl text-primary mr-2'
                    />
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
          <TextInput
            ref={inputRef}
            className='text-text border-0 bg-transparent p-0'
            multiline={true}
            value={commentTitle}
            onChangeText={(value) => {
              setCommentTitle(value);
            }}
            editable={isEditable}
            scrollEnabled={false}
          />
          <View className='flex-row items-center justify-between mt-1'>
            <TouchableOpacity onPress={() => handleLiked(_id)}>
              <View className='flex-row items-center gap-2'>
                {isLiked ? (
                  <AntDesign name='like1' className='text-xl text-primary' />
                ) : (
                  <AntDesign name='like2' className='text-xl text-text' />
                )}
                <Text className='text-text'>{liked_by.length}</Text>
              </View>
            </TouchableOpacity>
            <Text className='opacity-70 text-text text-xs text-end'>
              {dateFormat(new Date(created_at))}
            </Text>
          </View>

          {isOptionsVisible && (
            <View className='absolute bg-secondary-background p-2 rounded-lg right-0 top-8 shadow-lg'>
              <TouchableOpacity onPress={handleEdit} className='py-1'>
                <Text className='text-primary'>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleDeleteComment(_id);
                  setIsOptionsVisible(false);
                }}
                className='py-1'>
                <Text className='text-red-500'>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentContainer;
