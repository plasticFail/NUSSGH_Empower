import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  Picker,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';

const BloodGlucoseLog = (props) => {
  const [selectedValue, setSelectedValue] = useState('java');
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
          <Text style={styles.inputHeader}>Record Time:</Text>
          <TextInput
            style={styles.inputBox}
            placeholder=""
            secureTextEntry={true}
            placeholderTextColor="#a1a3a0"
          />
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
            dropDownStyle={{
              height: '700',
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate('AddLog')}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
