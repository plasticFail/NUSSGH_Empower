import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import Moment from 'moment';
import SuccessDialogue from '../../../components/successDialogue';
import {uploadBGLog} from './logRequestFunctions';
import {useNavigation} from '@react-navigation/native';

const BloodGlucoseLog = (props) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [bloodGlucose, setBloodGlucose] = useState('');
  const [displaydate, setDisplayDate] = useState('');
  const [successShow, setSuccessShow] = useState(false);
  Moment.locale('en');
  console.log(bloodGlucose);

  const handleSubmit = () => {
    if (checkTime()) {
      if (Number(bloodGlucose) >= 30 || Number(bloodGlucose) <= 0) {
        Alert.alert('Error', 'Invalid Blood Glucose Level', [{text: 'Got It'}]);
      } else if (bloodGlucose.match(/\d{1,2}\.|\d{1,2}$/g)) {
        var formatDate = Moment(date).format('DD/MM/YYYY HH:mm:ss');
        uploadBGLog(Number(bloodGlucose), formatDate).then((value) => {
          if (value == true) {
            if (bloodGlucose == '3.2') {
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
    var format = 'hh:mm';
    var timeNow = Moment(new Date(), format);
    var timeInput = Moment(date, format);
    if (date.toDateString() != new Date().toDateString()) {
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
    <View style={styles.bloodGlucoseLogScreen}>
      <View style={{flex: 2, alignItems: 'center'}}>
        <View style={{marginTop: '7%'}}>
          <Text style={styles.inputHeader}>Record Date Time:</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.inputBox1}
              value={Moment(date).format('MMMM Do YYYY, h:mm a')}
              placeholderTextColor="#a1a3a0"></TextInput>
            <Ionicons
              name="calendar-outline"
              size={20}
              style={{marginTop: '7%', marginStart: '7%'}}
              onPress={() => {
                setVisible(!visible);
              }}
            />
          </View>
          {visible && (
            <DatePicker
              visible={visible}
              date={date}
              onDateChange={setDate}
              mode="datetime"
            />
          )}
        </View>

        <View style={{marginTop: '3%'}}>
          <Text style={[styles.inputHeader, {marginTop: '7%'}]}>
            Blood Glucose: (mmol/L)
          </Text>
          <TextInput
            style={styles.inputBox}
            placeholderTextColor="#a1a3a0"
            keyboardType="decimal-pad"
            value={bloodGlucose}
            onChangeText={(value) => {
              setBloodGlucose(value);
            }}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <SuccessDialogue visible={successShow} type="Blood Glucose" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    margin: 0,
  },
  bloodGlucoseLogScreen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    backgroundColor: 'white',
  },
  header: {
    flex: 0.2,
    flexDirection: 'row',
    backgroundColor: '#aad326',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  inputHeader: {
    fontSize: 18,
    fontWeight: '500',
  },
  inputBox: {
    width: 350,
    height: 40,
    backgroundColor: '#EEF3BD',
    paddingStart: 20, //position placeholder text
    marginVertical: 10,
  },
  inputBox1: {
    width: 300,
    height: 40,
    backgroundColor: '#EEF3BD',
    paddingStart: 20, //position placeholder text
    marginVertical: 10,
    fontSize: 19,
  },
  button: {
    marginTop: '9%',
    backgroundColor: '#AAD326',
    width: 200,
    height: 40,
    borderRadius: 20,
    marginVertical: 10,
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
