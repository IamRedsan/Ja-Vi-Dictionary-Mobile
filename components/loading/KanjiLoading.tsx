import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Loading from '../ui/Loading';

const KanjiLoading: React.FC = () => {
  return (
    <View className="flex-1 h-full flex-col">
      <View className="items-center mt-3">
        <Loading height={170} width={120} borderRadius={10}></Loading>
      </View>
      <View className="m-1.5">
        <Loading height={30} width={200} borderRadius={10}></Loading>
      </View>
      <View className="m-1.5">
        <Loading height={30} width={250} borderRadius={10}></Loading>
      </View>
      <View className="m-1.5">
        <Loading height={30} width={100} borderRadius={10}></Loading>
      </View>
      <View className="m-1.5">
        <Loading height={30} width={100} borderRadius={10}></Loading>
      </View>
      <View className="m-1.5">
        <Loading height={30} width={250} borderRadius={10}></Loading>
      </View>
      <View className="m-1.5">
        <Loading height={30} width={300} borderRadius={10}></Loading>
      </View>
      <View className="m-1.5">
        <Loading height={300} width={370} borderRadius={10}></Loading>
      </View>
    </View>
  );
};
export default KanjiLoading;
