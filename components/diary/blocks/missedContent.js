import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import globalStyles from '../../../styles/globalStyles';
import {Colors} from '../../../styles/colors';
import {renderGreetingText} from '../../../commonFunctions/diaryFunctions';

const MissedContent = (props) => {
  const {arr, type} = props;
  return arr.length > 0 ? (
    <View style={{marginTop: '2%', marginBottom: '3%'}}>
      <Text style={globalStyles.pageDetails}>{arr.length} Missed</Text>
      <Text style={styles.missedPara}>
        You have <Text style={styles.missedText}>Missed </Text>your {type} in
        the <Text style={styles.period}>{renderGreetingText(arr)}</Text>
      </Text>
    </View>
  ) : (
    <View style={{marginTop: '2%'}}>
      <Text style={globalStyles.pageDetails}>Completed.</Text>
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

//comment
