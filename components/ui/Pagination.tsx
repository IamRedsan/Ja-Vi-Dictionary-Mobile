import React, { useMemo } from 'react';
import { View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { cssInterop } from 'nativewind';
import PaginationButton from './PaginationButton';

cssInterop(FontAwesome5, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true },
  } as any,
});

interface PaginationProps {
  totalPages: number;
  curPage: number;
  disabled: boolean;
  setCurPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  curPage,
  totalPages,
  setCurPage,
}) => {
  const pages = useMemo<number[]>(
    () => getSurroundingPages(totalPages, curPage),
    [curPage, totalPages]
  );

  return (
    <View className='flex-row justify-center items-center my-3'>
      {curPage > 1 && (
        <PaginationButton
          onPress={() => setCurPage(curPage - 1)}
          name='angle-left'
        />
      )}
      {pages.map((page) => (
        <PaginationButton
          key={page}
          onPress={() => setCurPage(page)}
          numPage={page}
          isActive={page === curPage}
        />
      ))}
      {curPage < totalPages && (
        <PaginationButton
          onPress={() => setCurPage(curPage + 1)}
          name='angle-right'
        />
      )}
    </View>
  );
};

export default Pagination;

const getSurroundingPages = (totalPages: number, page: number) => {
  if (page < 1 || page > totalPages) {
    return [];
  }

  const leftPage = Math.max(1, page - 2);
  const rightPage = Math.min(totalPages, page + 2);

  const surroundingPages: number[] = [];
  for (let i = leftPage; i <= rightPage; ++i) {
    surroundingPages.push(i);
  }
  return surroundingPages;
};
