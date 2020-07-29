import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import Moment from 'moment';
import SuccessDialogue from '../../../components/successDialogue';

const BloodGlucoseLog = (props) => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [displaydate, setDisplayDate] = useState('');
  const [successShow, setSuccessShow] = useState(false);
  Moment.locale('en');

  const handleSubmit = () => {
    setSuccessShow(true);
  };

  return (
    <Modal
      animationType="slide"
      visible={true}
      style={{...styles.bloodGlucoseLogScreen, ...props.style}}>
      <View style={styles.header}>
        <Ionicons
          name="backspace-sharp"
          size={30}
          onPress={() => props.navigation.goBack()}
          style={{marginEnd: '3%'}}
        />
        <Text style={{fontWeight: '500', fontSize: 20}}>
          Add Blood Glucose Log
        </Text>
      </View>
      <View style={{flex: 2, alignItems: 'center'}}>
        <View style={{marginTop: '7%'}}>
          <Text style={styles.inputHeader}>Record Date Time:</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.inputBox1}
              value={Moment(date).format('MMMM Do YYYY, h:mm:ss a')}
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

        <View style={{marginTop: '7%'}}>
          <Text style={styles.inputHeader}>Period:</Text>
          <DropDownPicker
            items={[
              {label: 'Before Breakfast', value: 'bBreakfast'},
              {label: 'Breakfast', value: 'breakfast'},
              {label: 'After Breakfast', value: 'abreakfast'},
              {label: 'Before Lunch', value: 'bLunch'},
              {label: 'Lunch', value: 'lunch'},
              {label: 'After Lunch', value: 'aLunch'},
              {label: 'Before Dinner', value: 'bDinner'},
              {label: 'Dinner', value: 'dinner'},
              {label: 'After Dinner', value: 'aDinner'},
            ]}
            defaultValue="bBreakfast"
            containerStyle={{
              height: 50,
              width: 300,
              marginTop: '3%',
            }}
            activeLabelStyle={{color: 'red'}}
            style={{backgroundColor: 'white'}}
            onChangeItem={(item) => console.log(item.label, item.value)}
          />
          <Text style={[styles.inputHeader, {marginTop: '7%'}]}>
            Blood Glucose: (mmol/L)
          </Text>
          <TextInput
            style={styles.inputBox}
            placeholder=""
            secureTextEntry={true}
            placeholderTextColor="#a1a3a0"
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <SuccessDialogue visible={successShow} type="Blood Glucose" />
      </View>
    </Modal>
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
    width: 300,
    height: 40,
    backgroundColor: '#EEF3BD',
    paddingStart: 30, //position placeholder text
    marginVertical: 10,
  },
  inputBox1: {
    width: 250,
    height: 40,
    backgroundColor: '#EEF3BD',
    paddingStart: 30, //position placeholder text
    marginVertical: 10,
  },
  button: {
    marginTop: '7%',
    backgroundColor: '#AAD326',
    width: 300,
    height: 40,
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 6,
  },
  buttonText: {
    fontSize: 23,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default BloodGlucoseLog;
