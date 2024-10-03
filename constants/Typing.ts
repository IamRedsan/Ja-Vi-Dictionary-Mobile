export const typingSingle1: {
  content?: string;
  romaji?: string;
}[][] = [
  [
    { content: 'あ', romaji: 'a' },
    { content: 'い', romaji: 'i' },
    { content: 'う', romaji: 'u' },
    { content: 'え', romaji: 'e' },
    { content: 'お', romaji: 'o' },
  ],

  // K- hàng
  [
    { content: 'か', romaji: 'ka' },
    { content: 'き', romaji: 'ki' },
    { content: 'く', romaji: 'ku' },
    { content: 'け', romaji: 'ke' },
    { content: 'こ', romaji: 'ko' },
  ],

  // S- hàng
  [
    { content: 'さ', romaji: 'sa' },
    { content: 'し', romaji: 'shi' },
    { content: 'す', romaji: 'su' },
    { content: 'せ', romaji: 'se' },
    { content: 'そ', romaji: 'so' },
  ],

  // T- hàng
  [
    { content: 'た', romaji: 'ta' },
    { content: 'ち', romaji: 'chi' },
    { content: 'つ', romaji: 'tsu' },
    { content: 'て', romaji: 'te' },
    { content: 'と', romaji: 'to' },
  ],

  // N- hàng
  [
    { content: 'な', romaji: 'na' },
    { content: 'に', romaji: 'ni' },
    { content: 'ぬ', romaji: 'nu' },
    { content: 'ね', romaji: 'ne' },
    { content: 'の', romaji: 'no' },
  ],

  // H- hàng
  [
    { content: 'は', romaji: 'ha' },
    { content: 'ひ', romaji: 'hi' },
    { content: 'ふ', romaji: 'fu' },
    { content: 'へ', romaji: 'he' },
    { content: 'ほ', romaji: 'ho' },
  ],

  // M- hàng
  [
    { content: 'ま', romaji: 'ma' },
    { content: 'み', romaji: 'mi' },
    { content: 'む', romaji: 'mu' },
    { content: 'め', romaji: 'me' },
    { content: 'も', romaji: 'mo' },
  ],

  // Y- hàng
  [
    { content: 'や', romaji: 'ya' },
    {},
    { content: 'ゆ', romaji: 'yu' },
    {},
    { content: 'よ', romaji: 'yo' },
  ],

  // R- hàng
  [
    { content: 'ら', romaji: 'ra' },
    { content: 'り', romaji: 'ri' },
    { content: 'る', romaji: 'ru' },
    { content: 'れ', romaji: 're' },
    { content: 'ろ', romaji: 'ro' },
  ],

  // W- hàng
  [
    { content: 'わ', romaji: 'wa' },
    {},
    { content: 'ん', romaji: 'n' },
    {},
    { content: 'を', romaji: 'wo' },
  ],
];

export const typingSingle2: {
  content?: string;
  romaji?: string;
}[][] = [
  [
    { content: 'が', romaji: 'ga' },
    { content: 'ぎ', romaji: 'gi' },
    { content: 'ぐ', romaji: 'gu' },
    { content: 'げ', romaji: 'ge' },
    { content: 'ご', romaji: 'go' },
  ],

  // Z- hàng (âm đục của S)
  [
    { content: 'ざ', romaji: 'za' },
    { content: 'じ', romaji: 'ji' },
    { content: 'ず', romaji: 'zu' },
    { content: 'ぜ', romaji: 'ze' },
    { content: 'ぞ', romaji: 'zo' },
  ],

  // D- hàng (âm đục của T)
  [
    { content: 'だ', romaji: 'da' },
    { content: 'ぢ', romaji: 'ji' },
    { content: 'づ', romaji: 'zu' },
    { content: 'で', romaji: 'de' },
    { content: 'ど', romaji: 'do' },
  ],

  // B- hàng (âm đục của H)
  [
    { content: 'ば', romaji: 'ba' },
    { content: 'び', romaji: 'bi' },
    { content: 'ぶ', romaji: 'bu' },
    { content: 'べ', romaji: 'be' },
    { content: 'ぼ', romaji: 'bo' },
  ],

  // P- hàng (âm bán đục của H)
  [
    { content: 'ぱ', romaji: 'pa' },
    { content: 'ぴ', romaji: 'pi' },
    { content: 'ぷ', romaji: 'pu' },
    { content: 'ぺ', romaji: 'pe' },
    { content: 'ぽ', romaji: 'po' },
  ],
];

export const typingCombined: {
  content?: string;
  romaji?: string;
}[][] = [
  // Âm ghép với 'ya', 'yu', 'yo' - K hàng
  [
    { content: 'きゃ', romaji: 'kya' },
    { content: 'きゅ', romaji: 'kyu' },
    { content: 'きょ', romaji: 'kyo' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - S hàng
  [
    { content: 'しゃ', romaji: 'sha' },
    { content: 'しゅ', romaji: 'shu' },
    { content: 'しょ', romaji: 'sho' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - T hàng
  [
    { content: 'ちゃ', romaji: 'cha' },
    { content: 'ちゅ', romaji: 'chu' },
    { content: 'ちょ', romaji: 'cho' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - N hàng
  [
    { content: 'にゃ', romaji: 'nya' },
    { content: 'にゅ', romaji: 'nyu' },
    { content: 'にょ', romaji: 'nyo' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - H hàng
  [
    { content: 'ひゃ', romaji: 'hya' },
    { content: 'ひゅ', romaji: 'hyu' },
    { content: 'ひょ', romaji: 'hyo' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - M hàng
  [
    { content: 'みゃ', romaji: 'mya' },
    { content: 'みゅ', romaji: 'myu' },
    { content: 'みょ', romaji: 'myo' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - R hàng
  [
    { content: 'りゃ', romaji: 'rya' },
    { content: 'りゅ', romaji: 'ryu' },
    { content: 'りょ', romaji: 'ryo' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - G hàng
  [
    { content: 'ぎゃ', romaji: 'gya' },
    { content: 'ぎゅ', romaji: 'gyu' },
    { content: 'ぎょ', romaji: 'gyo' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - Z hàng
  [
    { content: 'じゃ', romaji: 'ja' },
    { content: 'じゅ', romaji: 'ju' },
    { content: 'じょ', romaji: 'jo' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - D hàng
  [
    { content: 'ぢゃ', romaji: 'dya' },
    { content: 'ぢゅ', romaji: 'dyu' },
    { content: 'ぢょ', romaji: 'dyo' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - B hàng
  [
    { content: 'びゃ', romaji: 'bya' },
    { content: 'びゅ', romaji: 'byu' },
    { content: 'びょ', romaji: 'byo' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - P hàng
  [
    { content: 'ぴゃ', romaji: 'pya' },
    { content: 'ぴゅ', romaji: 'pyu' },
    { content: 'ぴょ', romaji: 'pyo' },
  ],
];
