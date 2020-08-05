import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Moment from 'moment';
import SuccessDialogue from '../../../components/successDialogue';
import {glucoseAddLogRequest} from '../../../netcalls/requestsLog';
import {useNavigation} from '@react-navigation/native';
import BloodGlucoseLogBlock from '../../../components/logs/bloodGlucoseLogBlock';

const BloodGlucoseLog = (props) => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [bloodGlucose, setBloodGlucose] = useState('');
  const [successShow, setSuccessShow] = useState(false);
  Moment.locale('en');
  console.log(bloodGlucose);

  const handleSubmit = () => {
    if (checkTime()) {
      if (Number(bloodGlucose) >= 30 || Number(bloodGlucose) <= 0) {
        Alert.alert('Error', 'Invalid Blood Glucose Level', [{text: 'Got It'}]);
      } else if (
        bloodGlucose.match(/^[0-9]+(\.[0-9]{1,2})?$/g) &&
        !bloodGlucose.includes(',') &&
        !bloodGlucose.includes('-')
      ) {
        let formatDate = Moment(date).format('DD/MM/YYYY HH:mm:ss');
        glucoseAddLogRequest(Number(bloodGlucose), formatDate).then((value) => {
          if (value === true) {
            if (bloodGlucose === '3.2') {
              navigation.navigate('HypoglycemiaReason');
            } else {
              setSuccessShow(true);
            }
          } else {
            Alert.alert('Error', 'Unexpected Error Occured', [
              {text: 'Try Again later'},
            ]);
          }
        });
      } else {
        Alert.alert(
          'Error',
          'Invalid Blood Glucose Input. Make sure at most 2 decimal place',
          [{text: 'Got It'}],
        );
      }
    }
  };

  const checkTime = () => {
    let format = 'hh:mm';
    let timeNow = Moment(new Date(), format);
    let timeInput = Moment(date, format);
    if (date.toDateString() !== new Date().toDateString()) {
      Alert.alert(
        'Error',
        'Invalid date. Make sure date selected is not after today. ',
        [{text: 'Got It'}],
      );
      return false;
    } else if (timeInput.isAfter(timeNow)) {
      Alert.alert(
        'Error',
        'Invalid date. Make sure time selected is not after current time. ',
        [{text: 'Got It'}],
      );
      return false;
    }
    return true;
  };

  return (
    <View style={styles.screen}>
      <BloodGlucoseLogBlock date={date} setDate={setDate} bloodGlucose={bloodGlucose} setBloodGlucose={setBloodGlucose}/>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <SuccessDialogue visible={successShow} type="Blood Glucose" />
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
  },
  button: {
    marginTop: '9%',
    backgroundColor: '#AAD326',
    borderRadius: 20,
    marginVertical: 10,
    paddingHorizontal: 40,
    paddingVertical: 6,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 23,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default BloodGlucoseLog;
