import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import Moment from 'moment';
import {getDateObj} from '../commonFunctions/diaryFunctions';
import {adjustSize} from '../commonFunctions/autoResizeFuncs';
import {TouchableOpacity} from 'react-native-gesture-handler';

const AppointmentContainer = (props) => {
  const {date, title, startTime, endTime, sessionId, type} = props;
  const {onClick} = props;

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.dateContainer}>
          <Text style={styles.textBold}>
            {Moment(getDateObj(date)).format('DD MMM')}
          </Text>
        </View>
        <View style={{margin: '3%'}}>
          <Text style={styles.textBold}>{title}</Text>
          <Text style={styles.text}>
            {startTime} - {endTime}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: '2%'}}>
        <Text style={[styles.text, {opacity: 0.5, flex: 1}]}>
          Session ID: {sessionId}
        </Text>
        <TouchableOpacity style={styles.chatButton}>
          <Text style={styles.buttonText}>Chat Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppointmentContainer;

const styles = StyleSheet.create({
  container: {
    borderRadius: 9.5,
    borderWidth: 1,
    borderColor: '#e2e8ee',
    margin: '2%',
    padding: '3%',
    backgroundColor: 'white',
  },
  dateContainer: {
    backgroundColor: '#e2e8ee',
    borderRadius: 4.1,
    padding: '3%',
    width: '15%',
  },
  textBold: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: adjustSize(18),
    textAlign: 'center',
  },
  text: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: adjustSize(16),
  },
  chatButton: {
    backgroundColor: '#16A950',
    paddingVertical: '3%',
    paddingHorizontal: '10%',
    borderRadius: 9.5,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'SFProDisplay-Bold',
    color: 'white',
    fontSize: adjustSize(18),
  },
});
