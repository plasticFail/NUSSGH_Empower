import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
//third party libs
import Moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';

const DateSelectionBlock = (props) => {
  const [visible, setVisible] = useState(false);
  Moment.locale('en');

  return (
    <>
      <Text style={[styles.inputHeader, {marginTop: '4%'}]}>
        Record Date Time:
      </Text>
      <View style={styles.subContainer}>
        <TextInput
          style={styles.inputBoxFill}
          value={Moment(props.date).format('MMMM Do YYYY, h:mm a')}
          editable={false}
          placeholderTextColor="#a1a3a0"
        />
        <Ionicons
          name="calendar-outline"
          size={30}
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
          minimumDate={Moment(new Date()).subtract(10, 'days').toDate()}
          maximumDate={Moment(new Date()).add(10, 'minutes').toDate()}
          mode="datetime"
        />
      )}
    </>
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
  inputBoxFill: {
    flex: 1,
    backgroundColor: '#EEF3BD',
    paddingStart: 20, //position placeholder text
    marginVertical: 10,
    fontSize: 19,
    color: 'black',
    padding: '2%',
  },
});

export default DateSelectionBlock;
