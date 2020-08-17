import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
//third party libs
import Moment from 'moment';
import {glucoseAddLogRequest} from '../../../netcalls/requestsLog';
import {useNavigation} from '@react-navigation/native';
//functions
import {storeLastBgLog} from '../../../storage/asyncStorageFunctions';
import {checkTime} from '../../../commonFunctions/logFunctions';
//components
import SuccessDialogue from '../../../components/successDialogue';
import BloodGlucoseLogBlock from '../../../components/logs/bloodGlucoseLogBlock';
import LogDisplay from '../../../components/logs/logDisplay';

const BloodGlucoseLog = (props) => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [bloodGlucose, setBloodGlucose] = useState('');
  const [successShow, setSuccessShow] = useState(false);
  Moment.locale('en');

  const handleSubmit = () => {
    if (checkTime(date)) {
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
        //store data in async storage.
        storeLastBgLog({
          value: bloodGlucose,
          date: Moment(date).format('YYYY/MM/DD'),
          time: Moment(date).format('h:mm a'),
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

  return (
    <View style={styles.screen}>
      <BloodGlucoseLogBlock
        date={date}
        setDate={setDate}
        bloodGlucose={bloodGlucose}
        setBloodGlucose={setBloodGlucose}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <LogDisplay type="BloodGlucose" />

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
    backgroundColor: 'white',
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
