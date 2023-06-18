import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';

export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <ActivityIndicator size={'large'} color="#fff" />
    </View>
  );
}
