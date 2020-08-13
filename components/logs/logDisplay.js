import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {
  getLastBgLog,
  getLastWeightLog,
} from '../../storage/asyncStorageFunctions';
import Moment from 'moment';

//for displaying the most recent value for weight/blood glucose log
//pass in a prop type="Weight" or "BloodGlucose"
const LogDisplay = (props) => {
  const {type} = props;
  const [lastValue, setLastValue] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (type === 'BloodGlucose') {
      getLastBgLog().then((response) => {
        let data = JSON.parse(response);
        setValues(data);
      });
    }
    if (type === 'Weight') {
      getLastWeightLog().then((response) => {
        let data = JSON.parse(response);
        setValues(data);
      });
    }
  }, []);

  const setValues = (data) => {
    if (data != null) {
      setLastValue(data.value);
      setTime(data.time);
    }
  };

  return (
    <View style={[styles.container, styles.shadow]}>
      {type === 'BloodGlucose' && (
        <Text style={styles.textStyle}>
          Your most recent blood glucose log is{' '}
          <Text style={styles.bold}>{lastValue}</Text> mmol/L at{' '}
          <Text style={styles.bold}>{time}</Text> today.
        </Text>
      )}
      {type === 'Weight' && (
        <Text style={styles.textStyle}>
          Your most recent weight log is{' '}
          <Text style={styles.bold}>{lastValue}</Text> kg at{' '}
          <Text style={styles.bold}>{time}</Text> today.
        </Text>
      )}
    </View>
  );
};

export default LogDisplay;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    paddingBottom: '5%',
    borderRadius: 20,
    padding: '4%',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    fontSize: 17,
  },
  bold: {
    fontWeight: '700',
    color: '#d22b55',
  },
});
