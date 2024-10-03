export const Alphabet: {
  hiragana?: string;
  katakana?: string;
  romaji?: string;
}[][] = [
  // Nguyên âm cơ bản (Vowel sounds)
  [
    { hiragana: 'あ', katakana: 'ア', romaji: 'a' },
    { hiragana: 'い', katakana: 'イ', romaji: 'i' },
    { hiragana: 'う', katakana: 'ウ', romaji: 'u' },
    { hiragana: 'え', katakana: 'エ', romaji: 'e' },
    { hiragana: 'お', katakana: 'オ', romaji: 'o' },
  ],

  // K- hàng
  [
    { hiragana: 'か', katakana: 'カ', romaji: 'ka' },
    { hiragana: 'き', katakana: 'キ', romaji: 'ki' },
    { hiragana: 'く', katakana: 'ク', romaji: 'ku' },
    { hiragana: 'け', katakana: 'ケ', romaji: 'ke' },
    { hiragana: 'こ', katakana: 'コ', romaji: 'ko' },
  ],

  // S- hàng
  [
    { hiragana: 'さ', katakana: 'サ', romaji: 'sa' },
    { hiragana: 'し', katakana: 'シ', romaji: 'shi' },
    { hiragana: 'す', katakana: 'ス', romaji: 'su' },
    { hiragana: 'せ', katakana: 'セ', romaji: 'se' },
    { hiragana: 'そ', katakana: 'ソ', romaji: 'so' },
  ],

  // T- hàng
  [
    { hiragana: 'た', katakana: 'タ', romaji: 'ta' },
    { hiragana: 'ち', katakana: 'チ', romaji: 'chi' },
    { hiragana: 'つ', katakana: 'ツ', romaji: 'tsu' },
    { hiragana: 'て', katakana: 'テ', romaji: 'te' },
    { hiragana: 'と', katakana: 'ト', romaji: 'to' },
  ],

  // N- hàng
  [
    { hiragana: 'な', katakana: 'ナ', romaji: 'na' },
    { hiragana: 'に', katakana: 'ニ', romaji: 'ni' },
    { hiragana: 'ぬ', katakana: 'ヌ', romaji: 'nu' },
    { hiragana: 'ね', katakana: 'ネ', romaji: 'ne' },
    { hiragana: 'の', katakana: 'ノ', romaji: 'no' },
  ],

  // H- hàng
  [
    { hiragana: 'は', katakana: 'ハ', romaji: 'ha' },
    { hiragana: 'ひ', katakana: 'ヒ', romaji: 'hi' },
    { hiragana: 'ふ', katakana: 'フ', romaji: 'fu' },
    { hiragana: 'へ', katakana: 'ヘ', romaji: 'he' },
    { hiragana: 'ほ', katakana: 'ホ', romaji: 'ho' },
  ],

  // M- hàng
  [
    { hiragana: 'ま', katakana: 'マ', romaji: 'ma' },
    { hiragana: 'み', katakana: 'ミ', romaji: 'mi' },
    { hiragana: 'む', katakana: 'ム', romaji: 'mu' },
    { hiragana: 'め', katakana: 'メ', romaji: 'me' },
    { hiragana: 'も', katakana: 'モ', romaji: 'mo' },
  ],

  // Y- hàng
  [
    { hiragana: 'や', katakana: 'ヤ', romaji: 'ya' },
    {},
    { hiragana: 'ゆ', katakana: 'ユ', romaji: 'yu' },
    {},
    { hiragana: 'よ', katakana: 'ヨ', romaji: 'yo' },
  ],

  // R- hàng
  [
    { hiragana: 'ら', katakana: 'ラ', romaji: 'ra' },
    { hiragana: 'り', katakana: 'リ', romaji: 'ri' },
    { hiragana: 'る', katakana: 'ル', romaji: 'ru' },
    { hiragana: 'れ', katakana: 'レ', romaji: 're' },
    { hiragana: 'ろ', katakana: 'ロ', romaji: 'ro' },
  ],

  // W- hàng
  [
    { hiragana: 'わ', katakana: 'ワ', romaji: 'wa' },
    {},
    { hiragana: 'ん', katakana: 'ン', romaji: 'n' },
    {},
    { hiragana: 'を', katakana: 'ヲ', romaji: 'wo' },
  ],

  // G- hàng
  [
    { hiragana: 'が', katakana: 'ガ', romaji: 'ga' },
    { hiragana: 'ぎ', katakana: 'ギ', romaji: 'gi' },
    { hiragana: 'ぐ', katakana: 'グ', romaji: 'gu' },
    { hiragana: 'げ', katakana: 'ゲ', romaji: 'ge' },
    { hiragana: 'ご', katakana: 'ゴ', romaji: 'go' },
  ],

  // Z- hàng
  [
    { hiragana: 'ざ', katakana: 'ザ', romaji: 'za' },
    { hiragana: 'じ', katakana: 'ジ', romaji: 'ji' },
    { hiragana: 'ず', katakana: 'ズ', romaji: 'zu' },
    { hiragana: 'ぜ', katakana: 'ゼ', romaji: 'ze' },
    { hiragana: 'ぞ', katakana: 'ゾ', romaji: 'zo' },
  ],

  // D- hàng
  [
    { hiragana: 'だ', katakana: 'ダ', romaji: 'da' },
    { hiragana: 'ぢ', katakana: 'ヂ', romaji: 'ji' },
    { hiragana: 'づ', katakana: 'ヅ', romaji: 'zu' },
    { hiragana: 'で', katakana: 'デ', romaji: 'de' },
    { hiragana: 'ど', katakana: 'ド', romaji: 'do' },
  ],

  // B- hàng
  [
    { hiragana: 'ば', katakana: 'バ', romaji: 'ba' },
    { hiragana: 'び', katakana: 'ビ', romaji: 'bi' },
    { hiragana: 'ぶ', katakana: 'ブ', romaji: 'bu' },
    { hiragana: 'べ', katakana: 'ベ', romaji: 'be' },
    { hiragana: 'ぼ', katakana: 'ボ', romaji: 'bo' },
  ],

  // P- hàng
  [
    { hiragana: 'ぱ', katakana: 'パ', romaji: 'pa' },
    { hiragana: 'ぴ', katakana: 'ピ', romaji: 'pi' },
    { hiragana: 'ぷ', katakana: 'プ', romaji: 'pu' },
    { hiragana: 'ぺ', katakana: 'ペ', romaji: 'pe' },
    { hiragana: 'ぽ', katakana: 'ポ', romaji: 'po' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - K hàng
  [
    { hiragana: 'きゃ', katakana: 'キャ', romaji: 'kya' },
    { hiragana: 'きゅ', katakana: 'キュ', romaji: 'kyu' },
    { hiragana: 'きょ', katakana: 'キョ', romaji: 'kyo' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - S hàng
  [
    { hiragana: 'しゃ', katakana: 'シャ', romaji: 'sha' },
    { hiragana: 'しゅ', katakana: 'シュ', romaji: 'shu' },
    { hiragana: 'しょ', katakana: 'ショ', romaji: 'sho' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - T hàng
  [
    { hiragana: 'ちゃ', katakana: 'チャ', romaji: 'cha' },
    { hiragana: 'ちゅ', katakana: 'チュ', romaji: 'chu' },
    { hiragana: 'ちょ', katakana: 'チョ', romaji: 'cho' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - N hàng
  [
    { hiragana: 'にゃ', katakana: 'ニャ', romaji: 'nya' },
    { hiragana: 'にゅ', katakana: 'ニュ', romaji: 'nyu' },
    { hiragana: 'にょ', katakana: 'ニョ', romaji: 'nyo' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - H hàng
  [
    { hiragana: 'ひゃ', katakana: 'ヒャ', romaji: 'hya' },
    { hiragana: 'ひゅ', katakana: 'ヒュ', romaji: 'hyu' },
    { hiragana: 'ひょ', katakana: 'ヒョ', romaji: 'hyo' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - M hàng
  [
    { hiragana: 'みゃ', katakana: 'ミャ', romaji: 'mya' },
    { hiragana: 'みゅ', katakana: 'ミュ', romaji: 'myu' },
    { hiragana: 'みょ', katakana: 'ミョ', romaji: 'myo' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - R hàng
  [
    { hiragana: 'りゃ', katakana: 'リャ', romaji: 'rya' },
    { hiragana: 'りゅ', katakana: 'リュ', romaji: 'ryu' },
    { hiragana: 'りょ', katakana: 'リョ', romaji: 'ryo' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - G hàng
  [
    { hiragana: 'ぎゃ', katakana: 'ギャ', romaji: 'gya' },
    { hiragana: 'ぎゅ', katakana: 'ギュ', romaji: 'gyu' },
    { hiragana: 'ぎょ', katakana: 'ギョ', romaji: 'gyo' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - Z hàng
  [
    { hiragana: 'じゃ', katakana: 'ジャ', romaji: 'ja' },
    { hiragana: 'じゅ', katakana: 'ジュ', romaji: 'ju' },
    { hiragana: 'じょ', katakana: 'ジョ', romaji: 'jo' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - D hàng
  [
    { hiragana: 'ぢゃ', katakana: 'ヂャ', romaji: 'ja' },
    { hiragana: 'ぢゅ', katakana: 'ヂュ', romaji: 'ju' },
    { hiragana: 'ぢょ', katakana: 'ヂョ', romaji: 'jo' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - B hàng
  [
    { hiragana: 'びゃ', katakana: 'ビャ', romaji: 'bya' },
    { hiragana: 'びゅ', katakana: 'ビュ', romaji: 'byu' },
    { hiragana: 'びょ', katakana: 'ビョ', romaji: 'byo' },
  ],

  // Âm ghép với 'ya', 'yu', 'yo' - P hàng
  [
    { hiragana: 'ぴゃ', katakana: 'ピャ', romaji: 'pya' },
    { hiragana: 'ぴゅ', katakana: 'ピュ', romaji: 'pyu' },
    { hiragana: 'ぴょ', katakana: 'ピョ', romaji: 'pyo' },
  ],
];
