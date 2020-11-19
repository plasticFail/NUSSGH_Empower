import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {adjustSize} from '../commonFunctions/autoResizeFuncs';

const CountdownTimer = (props) => {
  const [counter, setCounter] = useState(props.countdownTime);
  const [text, setText] = useState(
    props?.text === undefined ? ' Input new OTP within' : props.text,
  );

  //run set timeout function whenever component state is updated, counter value change
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      props.handleTimout();
    }
  }, [counter]);

  return (
    <View style={{...styles.timerContainer, ...props.style}}>
      <Text style={{fontSize: adjustSize(17)}}>
        {text} {counter} s
      </Text>
    </View>
  );
};

export default CountdownTimer;

const styles = StyleSheet.create({
  timerContainer: {
    marginTop: '2%',
    marginStart: '3%',
  },
});
