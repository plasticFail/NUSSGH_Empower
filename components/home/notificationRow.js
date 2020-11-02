import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Octicon from 'react-native-vector-icons/Octicons';
import {
  notif_log,
  morningObj,
  afternoonObj,
  eveningObj,
} from '../../commonFunctions/common';
import {checkLogDone} from '../../commonFunctions/logFunctions';
import {useNavigation} from '@react-navigation/native';

const logoStyle = {
  width: 35,
  height: 35,
  marginEnd: '5%',
};

const NotificationRow = (props) => {
  const {type, text, hour} = props;
  const navigation = useNavigation();

  const showLogNotComplete = () => {
    if (hour === morningObj.name) {
      return false;
    }
    return true;
  };

  const notifPress = () => {
    if (type === notif_log) {
      navigation.navigate('AddLog');
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => notifPress()}>
      {type === notif_log && showLogNotComplete() && (
        <>
          <Ionicon name="alert-circle-outline" size={40} color="red" />
          <View style={{flex: 1}}>
            <Text style={styles.notifDetails}>Incomplete Logs - </Text>
            <Text style={styles.notifDetails}>{text}</Text>
          </View>
          <Octicon
            name="primitive-dot"
            color={'red'}
            style={{alignSelf: 'center'}}
          />
        </>
      )}
    </TouchableOpacity>
  );
};

export default NotificationRow;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: '3%',
    flexDirection: 'row',
    padding: '2%',
  },
  notifDetails: {
    fontFamily: 'SFProDisplay-Regular',
    marginStart: '2%',
    fontSize: 15,
  },
});
