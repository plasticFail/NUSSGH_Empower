import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
//components
import DateSelectionBlock from './dateSelectionBlock';
import HypoglycemiaBlock from './hypoglycemiaBlock';

const BloodGlucoseLogBlock = (props) => {
  return (
    <View style={{flexDirection: 'column'}}>
      <DateSelectionBlock date={props.date} setDate={props.setDate} />

      <Text style={[styles.inputHeader, {marginTop: 20}]}>
        Blood Glucose: (mmol/L)
      </Text>
      <TextInput
        style={styles.inputBox}
        placeholderTextColor="#a1a3a0"
        placeholder={props.bloodGlucose}
        keyboardType="decimal-pad"
        value={props.bloodGlucose}
        onChangeText={(value) => {
          props.setBloodGlucose(value);
        }}
      />
      <HypoglycemiaBlock
        eatSelection={props.eatSelection}
        setEatSelection={props.setEatSelection}
        exerciseSelection={props.exerciseSelection}
        setExerciseSelection={props.setExerciseSelection}
        alcoholSelection={props.alcoholSelection}
        setAlcoholSelection={props.setAlcoholSelection}
        bloodGlucose={props.bloodGlucose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    fontSize: 19,
    backgroundColor: '#EEF3BD',
    paddingStart: 20, //position placeholder text
    marginVertical: 10,
    paddingBottom: '2%',
  },
  inputHeader: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default BloodGlucoseLogBlock;
