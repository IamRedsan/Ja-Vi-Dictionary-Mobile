import { View, Text } from 'react-native';
import Header from './Header';
import Row from './Row';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import React from 'react';
import { useAppContext } from '@/context/appContext';

const Settings = () => {
  const { user } = useAppContext();

  return (
    <View>
      {settingLinks.map((setting, idx) => {
        if (setting.requireLogin && !user) return;

        return (
          <React.Fragment key={idx}>
            <Header title={setting.section} />
            {setting.contents.map(({ icon, link, title }) => {
              return (
                <Link href={link} asChild key={link}>
                  <Row icon={icon} title={title} />
                </Link>
              );
            })}
          </React.Fragment>
        );
      })}
    </View>
  );
};

export default Settings;

type FontAwesomeName = keyof typeof FontAwesome.glyphMap;

const settingLinks: {
  section: string;
  requireLogin: boolean;
  contents: {
    icon: FontAwesomeName;
    title: string;
    link: any;
  }[];
}[] = [
  {
    section: 'Tài khoản',
    requireLogin: true,
    contents: [
      {
        icon: 'user',
        title: 'Thông tin cá nhân',
        link: '/setting/profile',
      },
      {
        icon: 'lock',
        title: 'Mật khẩu',
        link: '/setting/password',
      },
    ],
  },
  {
    section: 'Cài đặt',
    requireLogin: false,
    contents: [
      {
        icon: 'tint',
        title: 'Màu sắc',
        link: '/setting/theme',
      },
    ],
  },
  {
    section: 'Điều hướng',
    requireLogin: true,
    contents: [
      {
        icon: 'sign-out',
        title: 'Đăng xuất',
        link: '/setting/logout',
      },
    ],
  },
];
