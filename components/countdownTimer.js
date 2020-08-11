import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CountdownTimer = (props) => {
  const [counter, setCounter] = useState(120);

  //run set timeout function whenever component state is updated, counter value change
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter == 0) {
      props.handleTimout();
    }
  }, [counter]);

  return (
    <View style={styles.timerContainer}>
      <Text style={{fontSize: 17}}>Input new OTP within : {counter} s</Text>
    </View>
  );
};

export default CountdownTimer;

const styles = StyleSheet.create({
  timerContainer: {
    marginTop: '2%',
    alignItems: 'center',
  },
});
