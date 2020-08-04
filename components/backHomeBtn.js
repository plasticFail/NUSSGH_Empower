import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

Entypo.loadFont();

function BackHomeBtn() {
  const navigation = useNavigation();
  return (
    <View style={{flexDirection: 'row'}}>
      <Entypo
        name="chevron-left"
        size={30}
        onPress={() => navigation.navigate('DashBoard')}
      />
      <Text
        style={{fontSize: 18, flex: 1, marginTop: 3}}
        onPress={() => navigation.navigate('DashBoard')}>
        Home
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 5,
  },
});

export default BackHomeBtn;
