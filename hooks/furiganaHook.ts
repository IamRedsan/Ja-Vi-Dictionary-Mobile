import React from 'react';
import { combineFuri } from '../utils/furiganaUtil';

export function useFuriPairs(word: any, reading: any, furi: any) {
  return React.useMemo(
    () => combineFuri(word, reading, furi),
    [word, reading, furi]
  );
}
