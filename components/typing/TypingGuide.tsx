import React from 'react';
import { Text, View } from 'react-native';
import Table from './Table';
import {
  typingSingle1,
  typingSingle2,
  typingCombined,
} from '@/constants/Typing';
const Header = () => {
  return <div>Typing</div>;
};

const TypingGuide: React.FC = () => {
  return (
    <View>
      {/* Hoc cung Gaku */}
      <View className="flex-1 flex-wrap flex-row items-center justify-center py-2">
        <Text className="text-text text-2xl">Học gõ cùng </Text>
        <Text className="text-primary text-3xl font-bold">Gaku </Text>
        <Text className="text-text text-2xl">nào</Text>
      </View>
      <View className="flex-1 mb-4">
        <Table
          chars={[
            [
              {
                content: 'さっき',
                romaji: 'sakki',
              },
              {
                content: 'がっこう',
                romaji: 'gakkou',
              },
              {
                content: 'やっぱり',
                romaji: 'yappari',
              },
            ],
          ]}
          titlte="Âm ngắt「っ」viết bằng cách gấp đôi chữ cái phía trước trong của từ tiếng nhật phía sau. Ví dụ:"
        />
      </View>
      <View className="flex-1 mb-4">
        <Table
          chars={[
            [
              {
                content: 'サッカー',
                romaji: 'sakka-',
              },
              {
                content: 'パーティー',
                romaji: 'pa-thi-',
              },
              {
                content: 'スーパー',
                romaji: 'su-pa-',
              },
            ],
          ]}
          titlte="Gõ カタカナ tương tự như cách gõ hiragana, trường hợp trường âm sẽ gấp đôi nguyên âm ngay trước trường âm. Ví dụ:"
        />
      </View>
      <View className="flex-1 mb-4">
        <Table chars={typingSingle1} titlte="50 âm cơ bản" />
      </View>
      <View className="flex-1 mb-4">
        <Table chars={typingSingle2} titlte="Âm đục(濁音) và bán đục(半濁音)" />
      </View>
      <View className="flex-1 mb-4">
        <Table chars={typingCombined} titlte="Từ ghép" />
      </View>
    </View>
  );
};

export default TypingGuide;
