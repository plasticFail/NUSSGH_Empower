import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
//other screens
import BloodGlucoseLog from '../bloodGlucoseLog';
import BloodGlucoseLogBlock from '../../../../components/logs/bloodGlucoseLogBlock';
import FormBlock from '../../../../components/logs/formBlock';

const DailyLog1 = (props) => {
  const [date, setDate] = useState(new Date());
  const [bloodGlucose, setBloodGlucose] = useState('');
  const [show, setShow] = useState(false);

  //get form selection
  const getFormSelection = (boolValue) => {
    console.log(boolValue);
    if (boolValue == true) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Step 1: Blood Glucose Log</Text>
      </View>
      <Image
        style={styles.progress}
        resizeMode="contain"
        source={require('../../../../resources/images/progress1.png')}
      />
      <View
        style={[
          styles.container,
          styles.shadow,
          {marginBottom: '4%', paddingEnd: '1%'},
        ]}>
        <FormBlock
          question={'Did you take your blood glucose reading today?'}
          getFormSelection={getFormSelection}
          selectNo={false}
        />
      </View>
      {show && (
        <BloodGlucoseLogBlock
          date={date}
          setDate={setDate}
          bloodGlucose={bloodGlucose}
          setBloodGlucose={setBloodGlucose}
        />
      )}

      <TouchableOpacity
        style={{marginTop: '4%'}}
        onPress={() =>
        { const states = props.route.params
          console.log(states);
          props.navigation.navigate('DailyLog2', states)
        }}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  textContainer: {
    width: '100%',
  },
  text: {
    fontSize: 18,
  },
  progress: {
    width: '100%',
    height: 100,
  },
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    paddingBottom: '5%',
    borderRadius: 20,
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
});

export default DailyLog1;
