import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
//third party library
import Entypo from 'react-native-vector-icons/Entypo';

Entypo.loadFont();

const Result = (props) => {
  const {success, message} = props;

  return (
    <View>
      {success == true ? (
        <View style={{flexDirection: 'row', marginBottom: '2%'}}>
          <Entypo name="check" size={30} style={{color: 'green'}} />
          <Text style={styles.msg}>{message}</Text>
        </View>
      ) : (
        <View style={{flexDirection: 'row'}}>
          <Entypo name="cross" size={30} style={{color: 'red'}} />
          <Text style={styles.msg}>{message}</Text>
        </View>
      )}
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  msg: {
    fontSize: 17,
    marginTop: '1%',
    marginStart: '1%',
    flex: 1,
  },
});
