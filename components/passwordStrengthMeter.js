import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet, Dimensions} from 'react-native';
//third party lib
import zxcvbn from 'zxcvbn';
//component
import ProgressBar from './progressbar';

const PasswordStrengthMeter = (props) => {
  const [progress, setProgress] = useState('0%');
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState('Strength'); //weak, fair, good, strong
  // const [suggestion, setSuggestion] = useState('');
  const [color, setColor] = useState('red');

  const getPasswordResult = (result) => {
    setScore(result.score);
    if (score === 0) {
      setProgress('0%');
      setRank('Poor');
      setColor('red');
    } else if (score === 1) {
      setProgress('25%');
      setRank('Poor');
      setColor('red');
    } else if (score === 2) {
      setProgress('40%');
      setRank('Fair');
      setColor('yellow');
    } else if (score === 3) {
      setProgress('80%');
      setRank('Good');
      setColor('green');
    } else if (score === 4) {
      setProgress('100%');
      setRank('Strong');
      setColor('green');
    }
  };
  return (
    <>
      <TextInput
        style={styles.inputBox}
        placeholder="New password"
        secureTextEntry
        onChangeText={(value) => {
          let result = zxcvbn(value);
          getPasswordResult(result);
          props?.setPassword(value, result.score);
        }}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <ProgressBar
          progress={progress}
          useIndicatorLevel={true}
          reverse={true}
          containerStyle={{
            height: 9,
            width: '75%',
            alignSelf: 'center',
            marginStart: '2%',
            marginEnd: '1%',
          }}
        />
        {color === 'green' ? (
          <Text style={[styles.rankStyle, {color: '#60a354'}]}>{rank}</Text>
        ) : color === 'yellow' ? (
          <Text style={[styles.rankStyle, {color: '#f5c444'}]}>{rank}</Text>
        ) : (
          <Text style={[styles.rankStyle, {color: '#dc143c'}]}>{rank}</Text>
        )}
      </View>
    </>
  );
};

export default PasswordStrengthMeter;

const styles = StyleSheet.create({
  rankStyle: {
    fontSize: 16,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    marginEnd: '3%',
  },
  strengthText: {
    fontSize: 17,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
  },
  inputBox: {
    width: Dimensions.get('window').width - 30,
    borderRadius: 20,
    backgroundColor: '#EEF3BD',
    paddingStart: 30, //position placeholder text
    marginVertical: 10,
    alignSelf: 'center',
    padding: '3%',
  },
});
