import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
//component
import StepCounter from '../../stepCounter';
import logStyles from '../../../styles/logStyles';
import {Colors} from '../../../styles/colors';

const Counter = (props) => {
  const {count, setCount, parameter, fieldName} = props;
  return (
    <View style={styles.counterContainer}>
      <Text style={[logStyles.fieldName, {marginEnd: '2%'}]}>{fieldName}</Text>
      <StepCounter
        count={count}
        setCount={setCount}
        textStyle={styles.fieldText}
        parameter={parameter}
      />
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: 'row',
  },
  counterText: {
    textAlign: 'center',
    marginVertical: '5%',
  },
  fieldText: {
    fontSize: 18,
    fontFamily: 'SFProDisplay-Regular',
    color: Colors.logFieldColor,
  },
});
