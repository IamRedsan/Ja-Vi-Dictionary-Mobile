import {
  stripOkurigana,
  tokenize,
  isKanji,
  isKana,
  isHiragana,
  isKatakana,
} from 'wanakana';
import zip from 'just-zip-it';

export function combineFuri(word = '', reading = '', furi = '') {
  const furiLocs = parseFuri(furi);
  const isSpecialReading = furiLocs.length === 1 && [...word].every(isKanji);
  const isKanaWord = [...word].every(isKana);
  const isWanikaniMadness =
    [...reading].some(isHiragana) && [...reading].some(isKatakana);

  if (word === reading || isKanaWord) {
    return [['', word]];
  }

  if (!furi || isSpecialReading || isWanikaniMadness) {
    return basicFuri(word, reading);
  }

  return generatePairs(word, furiLocs);
}

export function basicFuri(word = '', reading = '') {
  if ([...word].every((c) => !isKana(c))) {
    return [[reading, word]];
  }

  const [bikago, okurigana]: [any, any] = [
    reading.slice(
      0,
      word.length -
        stripOkurigana(word, { leading: true, matchKanji: undefined }).length
    ),
    reading.slice(
      stripOkurigana(reading, { leading: undefined, matchKanji: word }).length
    ),
  ];

  const innerWordTokens = tokenize(
    removeExtraneousKana(word, bikago, okurigana)
  );
  let innerReadingChars: any = removeExtraneousKana(reading, bikago, okurigana);

  const kanjiOddKanaEvenRegex = RegExp(
    innerWordTokens
      .map((char: any) => (isKanji(char) ? '(.*)' : `(${char})`))
      .join('')
  );

  [, ...innerReadingChars] =
    innerReadingChars.match(kanjiOddKanaEvenRegex) || [];

  const ret = zip(innerReadingChars, innerWordTokens).map(
    skipRedundantReadings
  );

  if (bikago) {
    ret.unshift(['', bikago]);
  }

  if (okurigana) {
    ret.push(['', okurigana]);
  }

  return ret;
}

function removeExtraneousKana(str = '', leading = '', trailing = '') {
  return str
    .replace(RegExp(`^${leading}`), '')
    .replace(RegExp(`${trailing}$`), '');
}

function skipRedundantReadings([reading, word = '']: any) {
  return !reading || reading === word ? ['', word] : [reading, word];
}

export function parseFuri(data: any) {
  return typeof data === 'string'
    ? parseFuriString(data)
    : parseFuriObject(data);
}

function parseFuriObject(locations = {}) {
  return Object.entries(locations).map(([start, content]) => [
    [Number(start), Number(start) + 1],
    content,
  ]);
}

function parseFuriString(locations = '') {
  return locations.split(';').map((entry) => {
    const [indexes, content] = entry.split(':');
    const [start, end] = indexes.split('-').map(Number);

    return [[start, end ? end + 1 : start + 1], content];
  });
}
export function generatePairs(word = '', furiLocs: any = []) {
  let prevCharEnd = 0;

  return furiLocs.reduce(
    (pairs: any, [[start, end], furiText]: any, index: any, source: any) => {
      if (start !== prevCharEnd) {
        pairs.push(['', word.slice(prevCharEnd, start)]);
      }

      pairs.push([furiText, word.slice(start, end)]);

      if (end < word.length && !source[index + 1]) {
        pairs.push(['', word.slice(end)]);
      }

      prevCharEnd = end;
      return pairs;
    },
    []
  );
}
