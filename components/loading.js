import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

function Loading({isLoading}) {
  return <ActivityIndicator animating={isLoading}></ActivityIndicator>;
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
