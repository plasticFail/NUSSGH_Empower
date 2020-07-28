import React from 'react';
import {View, StyleSheet, Text, Modal, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MedicationLog = (props) => {
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
          <Text style={styles.inputHeader}>Record Time:</Text>
          <TextInput
            style={styles.inputBox}
            placeholder=""
            secureTextEntry={true}
            placeholderTextColor="#a1a3a0"
          />
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
});

export default MedicationLog;
