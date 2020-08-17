import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Summary from '../../../components/diary/summary';

//see if class or functional component
const DiaryDetail = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.summaryText}>Summary: </Text>
      <View style={{padding: '2%'}}>
        <Summary />
      </View>
    </View>
  );
};

export default DiaryDetail;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    width: '100%',
  },
  summaryText: {
    fontSize: 20,
    margin: '2%',
    color: '#47685A',
    fontWeight: '700',
  },
});
