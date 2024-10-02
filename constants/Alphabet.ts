export const Alphabet: {
  hiragana?: string;
  katakana?: string;
  romaji?: string;
  mainLink?: string;
  subLink?: string; // subLink chỉ có trong âm ghép
}[][] = [
  // Nguyên âm cơ bản (Vowel sounds)
  [
    { hiragana: 'あ', katakana: 'ア', romaji: 'a', mainLink: 'link_to_a' },
    { hiragana: 'い', katakana: 'イ', romaji: 'i', mainLink: 'link_to_i' },
    { hiragana: 'う', katakana: 'ウ', romaji: 'u', mainLink: 'link_to_u' },
    { hiragana: 'え', katakana: 'エ', romaji: 'e', mainLink: 'link_to_e' },
    { hiragana: 'お', katakana: 'オ', romaji: 'o', mainLink: 'link_to_o' },
  ],

  // K- hàng
  [
    { hiragana: 'か', katakana: 'カ', romaji: 'ka', mainLink: 'link_to_ka' },
    { hiragana: 'き', katakana: 'キ', romaji: 'ki', mainLink: 'link_to_ki' },
    { hiragana: 'く', katakana: 'ク', romaji: 'ku', mainLink: 'link_to_ku' },
    { hiragana: 'け', katakana: 'ケ', romaji: 'ke', mainLink: 'link_to_ke' },
    { hiragana: 'こ', katakana: 'コ', romaji: 'ko', mainLink: 'link_to_ko' },
  ],

  // S- hàng
  [
    { hiragana: 'さ', katakana: 'サ', romaji: 'sa', mainLink: 'link_to_sa' },
    { hiragana: 'し', katakana: 'シ', romaji: 'shi', mainLink: 'link_to_shi' },
    { hiragana: 'す', katakana: 'ス', romaji: 'su', mainLink: 'link_to_su' },
    { hiragana: 'せ', katakana: 'セ', romaji: 'se', mainLink: 'link_to_se' },
    { hiragana: 'そ', katakana: 'ソ', romaji: 'so', mainLink: 'link_to_so' },
  ],

  // T- hàng
  [
    { hiragana: 'た', katakana: 'タ', romaji: 'ta', mainLink: 'link_to_ta' },
    { hiragana: 'ち', katakana: 'チ', romaji: 'chi', mainLink: 'link_to_chi' },
    { hiragana: 'つ', katakana: 'ツ', romaji: 'tsu', mainLink: 'link_to_tsu' },
    { hiragana: 'て', katakana: 'テ', romaji: 'te', mainLink: 'link_to_te' },
    { hiragana: 'と', katakana: 'ト', romaji: 'to', mainLink: 'link_to_to' },
  ],

  // N- hàng
  [
    { hiragana: 'な', katakana: 'ナ', romaji: 'na', mainLink: 'link_to_na' },
    { hiragana: 'に', katakana: 'ニ', romaji: 'ni', mainLink: 'link_to_ni' },
    { hiragana: 'ぬ', katakana: 'ヌ', romaji: 'nu', mainLink: 'link_to_nu' },
    { hiragana: 'ね', katakana: 'ネ', romaji: 'ne', mainLink: 'link_to_ne' },
    { hiragana: 'の', katakana: 'ノ', romaji: 'no', mainLink: 'link_to_no' },
  ],

  // H- hàng
  [
    { hiragana: 'は', katakana: 'ハ', romaji: 'ha', mainLink: 'link_to_ha' },
    { hiragana: 'ひ', katakana: 'ヒ', romaji: 'hi', mainLink: 'link_to_hi' },
    { hiragana: 'ふ', katakana: 'フ', romaji: 'fu', mainLink: 'link_to_fu' },
    { hiragana: 'へ', katakana: 'ヘ', romaji: 'he', mainLink: 'link_to_he' },
    { hiragana: 'ほ', katakana: 'ホ', romaji: 'ho', mainLink: 'link_to_ho' },
  ],

  // M- hàng
  [
    { hiragana: 'ま', katakana: 'マ', romaji: 'ma', mainLink: 'link_to_ma' },
    { hiragana: 'み', katakana: 'ミ', romaji: 'mi', mainLink: 'link_to_mi' },
    { hiragana: 'む', katakana: 'ム', romaji: 'mu', mainLink: 'link_to_mu' },
    { hiragana: 'め', katakana: 'メ', romaji: 'me', mainLink: 'link_to_me' },
    { hiragana: 'も', katakana: 'モ', romaji: 'mo', mainLink: 'link_to_mo' },
  ],

  // Y- hàng
  [
    { hiragana: 'や', katakana: 'ヤ', romaji: 'ya', mainLink: 'link_to_ya' },
    {},
    { hiragana: 'ゆ', katakana: 'ユ', romaji: 'yu', mainLink: 'link_to_yu' },
    {},
    { hiragana: 'よ', katakana: 'ヨ', romaji: 'yo', mainLink: 'link_to_yo' },
  ],

  // R- hàng
  [
    { hiragana: 'ら', katakana: 'ラ', romaji: 'ra', mainLink: 'link_to_ra' },
    { hiragana: 'り', katakana: 'リ', romaji: 'ri', mainLink: 'link_to_ri' },
    { hiragana: 'る', katakana: 'ル', romaji: 'ru', mainLink: 'link_to_ru' },
    { hiragana: 'れ', katakana: 'レ', romaji: 're', mainLink: 'link_to_re' },
    { hiragana: 'ろ', katakana: 'ロ', romaji: 'ro', mainLink: 'link_to_ro' },
  ],

  // W- hàng
  [
    { hiragana: 'わ', katakana: 'ワ', romaji: 'wa', mainLink: 'link_to_wa' },
    {},
    { hiragana: 'を', katakana: 'ヲ', romaji: 'wo', mainLink: 'link_to_wo' },
    {},
    { hiragana: 'ん', katakana: 'ン', romaji: 'n', mainLink: 'link_to_n' },
  ],

  [
    { hiragana: 'が', katakana: 'ガ', romaji: 'ga', mainLink: 'link_to_ga' },
    { hiragana: 'ぎ', katakana: 'ギ', romaji: 'gi', mainLink: 'link_to_gi' },
    { hiragana: 'ぐ', katakana: 'グ', romaji: 'gu', mainLink: 'link_to_gu' },
    { hiragana: 'げ', katakana: 'ゲ', romaji: 'ge', mainLink: 'link_to_ge' },
    { hiragana: 'ご', katakana: 'ゴ', romaji: 'go', mainLink: 'link_to_go' },
  ],

  [
    { hiragana: 'ざ', katakana: 'ザ', romaji: 'za', mainLink: 'link_to_za' },
    { hiragana: 'じ', katakana: 'ジ', romaji: 'ji', mainLink: 'link_to_ji' },
    { hiragana: 'ず', katakana: 'ズ', romaji: 'zu', mainLink: 'link_to_zu' },
    { hiragana: 'ぜ', katakana: 'ゼ', romaji: 'ze', mainLink: 'link_to_ze' },
    { hiragana: 'ぞ', katakana: 'ゾ', romaji: 'zo', mainLink: 'link_to_zo' },
  ],
  [
    { hiragana: 'だ', katakana: 'ダ', romaji: 'da', mainLink: 'link_to_da' },
    { hiragana: 'ぢ', katakana: 'ヂ', romaji: 'ji', mainLink: 'link_to_di' },
    { hiragana: 'づ', katakana: 'ヅ', romaji: 'zu', mainLink: 'link_to_du' },
    { hiragana: 'で', katakana: 'デ', romaji: 'de', mainLink: 'link_to_de' },
    { hiragana: 'ど', katakana: 'ド', romaji: 'do', mainLink: 'link_to_do' },
  ],
  [
    { hiragana: 'ば', katakana: 'バ', romaji: 'ba', mainLink: 'link_to_ba' },
    { hiragana: 'び', katakana: 'ビ', romaji: 'bi', mainLink: 'link_to_bi' },
    { hiragana: 'ぶ', katakana: 'ブ', romaji: 'bu', mainLink: 'link_to_bu' },
    { hiragana: 'べ', katakana: 'ベ', romaji: 'be', mainLink: 'link_to_be' },
    { hiragana: 'ぼ', katakana: 'ボ', romaji: 'bo', mainLink: 'link_to_bo' },
  ],
  [
    { hiragana: 'ば', katakana: 'バ', romaji: 'ba', mainLink: 'link_to_ba' },
    { hiragana: 'び', katakana: 'ビ', romaji: 'bi', mainLink: 'link_to_bi' },
    { hiragana: 'ぶ', katakana: 'ブ', romaji: 'bu', mainLink: 'link_to_bu' },
    { hiragana: 'べ', katakana: 'ベ', romaji: 'be', mainLink: 'link_to_be' },
    { hiragana: 'ぼ', katakana: 'ボ', romaji: 'bo', mainLink: 'link_to_bo' },
  ],

  [
    { hiragana: 'ぱ', katakana: 'パ', romaji: 'pa', mainLink: 'link_to_pa' },
    { hiragana: 'ぴ', katakana: 'ピ', romaji: 'pi', mainLink: 'link_to_pi' },
    { hiragana: 'ぷ', katakana: 'プ', romaji: 'pu', mainLink: 'link_to_pu' },
    { hiragana: 'ぺ', katakana: 'ペ', romaji: 'pe', mainLink: 'link_to_pe' },
    { hiragana: 'ぽ', katakana: 'ポ', romaji: 'po', mainLink: 'link_to_po' },
  ],

  [
    {
      hiragana: 'きゃ',
      katakana: 'キャ',
      romaji: 'kya',
      mainLink: 'link_to_kya',
      subLink: 'link_to_kya_sub',
    },
    {
      hiragana: 'きゅ',
      katakana: 'キュ',
      romaji: 'kyu',
      mainLink: 'link_to_kyu',
      subLink: 'link_to_kyu_sub',
    },
    {
      hiragana: 'きょ',
      katakana: 'キョ',
      romaji: 'kyo',
      mainLink: 'link_to_kyo',
      subLink: 'link_to_kyo_sub',
    },
  ],

  [
    {
      hiragana: 'ちゃ',
      katakana: 'チャ',
      romaji: 'cha',
      mainLink: 'link_to_cha',
      subLink: 'link_to_cha_sub',
    },
    {
      hiragana: 'ちゅ',
      katakana: 'チュ',
      romaji: 'chu',
      mainLink: 'link_to_chu',
      subLink: 'link_to_chu_sub',
    },
    {
      hiragana: 'ちょ',
      katakana: 'チョ',
      romaji: 'cho',
      mainLink: 'link_to_cho',
      subLink: 'link_to_cho_sub',
    },
  ],

  [
    {
      hiragana: 'にゃ',
      katakana: 'ニャ',
      romaji: 'nya',
      mainLink: 'link_to_nya',
      subLink: 'link_to_nya_sub',
    },
    {
      hiragana: 'にゅ',
      katakana: 'ニュ',
      romaji: 'nyu',
      mainLink: 'link_to_nyu',
      subLink: 'link_to_nyu_sub',
    },
    {
      hiragana: 'にょ',
      katakana: 'ニョ',
      romaji: 'nyo',
      mainLink: 'link_to_nyo',
      subLink: 'link_to_nyo_sub',
    },
  ],

  [
    {
      hiragana: 'ひゃ',
      katakana: 'ヒャ',
      romaji: 'hya',
      mainLink: 'link_to_hya',
      subLink: 'link_to_hya_sub',
    },
    {
      hiragana: 'ひゅ',
      katakana: 'ヒュ',
      romaji: 'hyu',
      mainLink: 'link_to_hyu',
      subLink: 'link_to_hyu_sub',
    },
    {
      hiragana: 'ひょ',
      katakana: 'ヒョ',
      romaji: 'hyo',
      mainLink: 'link_to_hyo',
      subLink: 'link_to_hyo_sub',
    },
  ],

  [
    {
      hiragana: 'みゃ',
      katakana: 'ミャ',
      romaji: 'mya',
      mainLink: 'link_to_mya',
      subLink: 'link_to_mya_sub',
    },
    {
      hiragana: 'みゅ',
      katakana: 'ミュ',
      romaji: 'myu',
      mainLink: 'link_to_myu',
      subLink: 'link_to_myu_sub',
    },
    {
      hiragana: 'みょ',
      katakana: 'ミョ',
      romaji: 'myo',
      mainLink: 'link_to_myo',
      subLink: 'link_to_myo_sub',
    },
  ],

  [
    {
      hiragana: 'りゃ',
      katakana: 'リャ',
      romaji: 'rya',
      mainLink: 'link_to_rya',
      subLink: 'link_to_rya_sub',
    },
    {
      hiragana: 'りゅ',
      katakana: 'リュ',
      romaji: 'ryu',
      mainLink: 'link_to_ryu',
      subLink: 'link_to_ryu_sub',
    },
    {
      hiragana: 'りょ',
      katakana: 'リョ',
      romaji: 'ryo',
      mainLink: 'link_to_ryo',
      subLink: 'link_to_ryo_sub',
    },
  ],
  [
    {
      hiragana: 'ぎゃ',
      katakana: 'ギャ',
      romaji: 'gya',
      mainLink: 'link_to_gya',
      subLink: 'link_to_gya_sub',
    },
    {
      hiragana: 'ぎゅ',
      katakana: 'ギュ',
      romaji: 'gyu',
      mainLink: 'link_to_gyu',
      subLink: 'link_to_gyu_sub',
    },
    {
      hiragana: 'ぎょ',
      katakana: 'ギョ',
      romaji: 'gyo',
      mainLink: 'link_to_gyo',
      subLink: 'link_to_gyo_sub',
    },
  ],
  [
    {
      hiragana: 'じゃ',
      katakana: 'ジャ',
      romaji: 'ja',
      mainLink: 'link_to_ja',
      subLink: 'link_to_ja_sub',
    },
    {
      hiragana: 'じゅ',
      katakana: 'ジュ',
      romaji: 'ju',
      mainLink: 'link_to_ju',
      subLink: 'link_to_ju_sub',
    },
    {
      hiragana: 'じょ',
      katakana: 'ジョ',
      romaji: 'jo',
      mainLink: 'link_to_jo',
      subLink: 'link_to_jo_sub',
    },
  ],
  [
    {
      hiragana: 'びゃ',
      katakana: 'ビャ',
      romaji: 'bya',
      mainLink: 'link_to_bya',
      subLink: 'link_to_bya_sub',
    },
    {
      hiragana: 'びゅ',
      katakana: 'ビュ',
      romaji: 'byu',
      mainLink: 'link_to_byu',
      subLink: 'link_to_byu_sub',
    },
    {
      hiragana: 'びょ',
      katakana: 'ビョ',
      romaji: 'byo',
      mainLink: 'link_to_byo',
      subLink: 'link_to_byo_sub',
    },
  ],
  [
    {
      hiragana: 'ぴゃ',
      katakana: 'ピャ',
      romaji: 'pya',
      mainLink: 'link_to_pya',
      subLink: 'link_to_pya_sub',
    },
    {
      hiragana: 'ぴゅ',
      katakana: 'ピュ',
      romaji: 'pyu',
      mainLink: 'link_to_pyu',
      subLink: 'link_to_pyu_sub',
    },
    {
      hiragana: 'ぴょ',
      katakana: 'ピョ',
      romaji: 'pyo',
      mainLink: 'link_to_pyo',
      subLink: 'link_to_pyo_sub',
    },
  ],
];
