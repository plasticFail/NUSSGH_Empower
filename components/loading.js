import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

function Loading({isLoading}) {
  return (
    <ActivityIndicator
      animating={isLoading}
      color="white"
      style={{marginTop: '5%'}}/>
  );
}

export default Loading;

