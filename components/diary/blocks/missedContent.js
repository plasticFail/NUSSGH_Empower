import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import globalStyles from '../../../styles/globalStyles';
import {Colors} from '../../../styles/colors';

const MissedContent = (props) => {
  const {arr, type} = props;
  return (
    <View style={{marginTop: '2%'}}>
      <Text style={globalStyles.pageDetails}>{arr.length} Missed</Text>
      <Text style={styles.missedPara}>
        You have <Text style={styles.missedText}>Missed </Text>your {type} in
        the <Text style={styles.period}>{renderText(arr)}</Text>
      </Text>
    </View>
  );
};

export default MissedContent;

const styles = StyleSheet.create({
  missedPara: {
    marginStart: '4%',
    marginTop: '3%',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    marginEnd: '4%',
  },
  missedText: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 17,
    color: Colors.alertColor,
  },
  period: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 17,
  },
});

function renderText(arr) {
  let string = '';
  if (arr.length === 3) {
    for (var i = 0; i < arr.length; i++) {
      if (i === 2) {
        string += 'and ' + arr[i] + '.';
        return string;
      }
      string += arr[i] + ', ';
    }
  } else if (arr.length === 2) {
    string = arr[0] + ' and ' + arr[1] + '.';
  } else {
    string = arr[0] + '.';
  }
  return string;
}
