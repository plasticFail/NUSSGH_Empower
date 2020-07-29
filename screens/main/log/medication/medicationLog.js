import React, {useState} from 'react';
import {View, StyleSheet, Text, Modal, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import Moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

const MedicationLog = (props) => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleSubmit = () => {};

  return (
    <Modal
      animationType="slide"
      visible={true}
      style={{...styles.medicationScreen, ...props.style}}>
      <View style={styles.header}>
        <Ionicons
          name="backspace-sharp"
          size={30}
          onPress={() => props.navigation.goBack()}
          style={{marginEnd: '3%'}}
        />
        <Text style={{fontWeight: '500', fontSize: 20}}>
          Add Medication Log
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
          <Text style={{fontSize: 20, fontWeight: '600', color: '#133d2c'}}>
            Start Adding A Medication:
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Add Medicine</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  medicationScreen: {
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
    backgroundColor: '#EEF3BD',
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

export default MedicationLog;
