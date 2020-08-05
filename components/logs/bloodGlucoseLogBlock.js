import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import Moment from 'moment';


const BloodGlucoseLogBlock = (props) => {
  const [visible, setVisible] = useState(false);
  Moment.locale('en');

  return (
      <View style={{flexDirection: 'column'}}>
          <Text style={styles.inputHeader}>Record Date Time:</Text>
          <View style={styles.subContainer}>
            <TextInput
              style={styles.inputBoxFill}
              value={Moment(props.date).format('MMMM Do YYYY, h:mm a')}
              editable={false}
              placeholderTextColor="#a1a3a0"/>
            <Ionicons
              name="calendar-outline"
              size={20}
              style={{marginStart: '5%'}}
              onPress={() => {
                setVisible(!visible);
              }}
            />
          </View>
          {visible && (
            <DatePicker
              visible={visible}
              date={props.date}
              onDateChange={props.setDate}
              mode="datetime"
            />
          )}

        <Text style={[styles.inputHeader, {marginTop: 20}]}>
          Blood Glucose: (mmol/L)
        </Text>
        <TextInput
          style={styles.inputBox}
          placeholderTextColor="#a1a3a0"
          keyboardType="decimal-pad"
          value={props.bloodGlucose}
          onChangeText={(value) => {
            props.setBloodGlucose(value);
          }}
        />

      </View>

  );
};

const styles = StyleSheet.create({
  subContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputHeader: {
    fontSize: 18,
    fontWeight: '500',
  },
  inputBox: {
    fontSize: 19,
    backgroundColor: '#EEF3BD',
    paddingStart: 20, //position placeholder text
    marginVertical: 10,
  },
  inputBoxFill: {
    flex:1,
    backgroundColor: '#EEF3BD',
    paddingStart: 20, //position placeholder text
    marginVertical: 10,
    fontSize: 19,
    color: 'black',
  },
});

export default BloodGlucoseLogBlock;
