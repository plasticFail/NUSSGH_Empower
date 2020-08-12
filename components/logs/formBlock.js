import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import RadioButton from '../radioButton';

const FormBlock = (props) => {
  const [selectYes, setSelectedYes] = useState(
    props.defaultValue === 'yes' || false,
  );
  const [selectNo, setSelectedNo] = useState(
    props.defaultValue === 'no' || props.selectNo,
  );
  const handleButtonPress = (selectItem) => {
    if (selectItem == 'yes') {
      setSelectedYes(true);
      setSelectedNo(false);
      props.getFormSelection(true);
    }
    if (selectItem == 'no') {
      setSelectedYes(false);
      setSelectedNo(true);
      props.getFormSelection(false);
    }
  };

  return (
    <View>
      <Text style={styles.questionHeader}>{props.question}</Text>
      <View style={styles.buttonGroupStyle}>
        <TouchableOpacity onPress={() => handleButtonPress('yes')}>
          <RadioButton
            btnText={'Yes'}
            color={props.color}
            selected={selectYes}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginStart: '40%'}}
          onPress={() => handleButtonPress('no')}>
          <RadioButton btnText={'No'} color={props.color} selected={selectNo} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormBlock;

const styles = StyleSheet.create({
  questionHeader: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
    marginTop: '5%',
    marginStart: '2%',
  },
  buttonGroupStyle: {
    flexDirection: 'row',
    marginTop: ' 5%',
    marginStart: '5%',
  },
});
