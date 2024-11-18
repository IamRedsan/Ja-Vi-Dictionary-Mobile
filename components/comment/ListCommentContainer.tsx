import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import CommentContainer from './CommentContainer';
import Pagination from '../ui/Pagination';

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

const COMMENTS_PER_PAGE = 1;

const ListCommentContainer: React.FC<ListCommentContainerProps> = ({
  comments,
  isKanjiComment,
}) => {
  const [curPage, setCurPage] = useState(1);

  const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);
  const paginatedComments = comments.slice(
    (curPage - 1) * COMMENTS_PER_PAGE,
    curPage * COMMENTS_PER_PAGE
  );

  return (
    <View className='flex-1 flex-col'>
      <ScrollView className='p-2'>
        {paginatedComments.map((comment) => (
          <CommentContainer
            key={comment._id}
            {...comment}
            isKanjiComment={isKanjiComment}
          />
        ))}
        <View className='flex-1 mt-2'>
          <Pagination
            curPage={curPage}
            disabled={comments.length === 0}
            setCurPage={setCurPage}
            totalPages={totalPages}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ListCommentContainer;
