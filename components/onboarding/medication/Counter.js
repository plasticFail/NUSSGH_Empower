import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
//component
import StepCounter from '../../stepCounter';

const Counter = (props) => {
  const {count, setCount, parameter, fieldName} = props;
  return (
    <View style={styles.counterContainer}>
      <Text style={styles.fieldText}>{fieldName}</Text>
      <StepCounter
        count={count}
        setCount={setCount}
        textStyle={styles.counterText}
        parameter={parameter}
      />
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: 'row',
    marginTop: '2%',
    marginBottom: '2%',
  },
  counterText: {
    textAlign: 'center',
    marginVertical: '5%',
  },
  fieldText: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: '2%',
    flex: 1,
  },
});
