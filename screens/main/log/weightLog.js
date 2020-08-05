import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {weightAddLogRequest} from '../../../netcalls/requestsLog';
import SuccessDialogue from '../../../components/successDialogue';

export default class WeightLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: '',
      date: new Date(),
      calendarVisible: false,
      showSucess: false,
    };
    this.setDate = this.setDate.bind(this);
    this.checkTime = this.checkTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkInputFormat = this.checkInputFormat.bind(this);
  }

  setCalendarVisible() {
    this.setState({calendarVisible: !this.state.calendarVisible});
  }

  setDate(date) {
    this.setState({date: date});
    console.log(this.state.date);
  }

  handleSubmit() {
    //check date valid and weight format (1 dp)
    console.log('---' + Number(this.state.weight));
    if (this.checkTime() && this.checkInputFormat(this.state.weight)) {
      var formatDate = Moment(this.state.date).format('DD/MM/YYYY HH:mm:ss');
      weightAddLogRequest(Number(this.state.weight), formatDate).then(
        (value) => {
          if (value == true) {
            this.setState({showSucess: true});
          } else {
            Alert.alert('Error', 'Unexpected Error Occured ', [
              {text: 'Try Again Later'},
            ]);
          }
        },
      );
    }
  }

  checkTime() {
    var format = 'hh:mm';
    var timeNow = Moment(new Date(), format);
    var timeInput = Moment(this.state.date, format);
    if (this.state.date.toDateString() != new Date().toDateString()) {
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
  }

  checkInputFormat() {
    if (
      this.state.weight.match(/^[0-9]+(\.[0-9]{1})?$/g) &&
      !this.state.weight.includes(',') &&
      !this.state.weight.includes('-') &&
      Number(this.state.weight) <= 200 &&
      Number(this.state.weight) >= 40
    ) {
      return true;
    } else {
      Alert.alert(
        'Error',
        'Invalid Weight. Make sure weight input is at most 1 decimal place, no spaces or special character between numbers, between 40 to 200kg. ',
        [{text: 'Got It'}],
      );
      return false;
    }
  }

  render() {
    const {date, calendarVisible, showSucess} = this.state;
    return (
      <View style={styles.container}>
        <View
          style={{
            marginTop: '7%',
            marginStart: '5%',
            justifyContent: 'space-around',
          }}>
          <RenderDateTime
            date={date}
            calendarVisible={calendarVisible}
            setDate={this.setDate}
            setCalendarVisible={() => this.setCalendarVisible(calendarVisible)}
          />
          <Text style={[styles.inputHeader, {marginTop: '5%'}]}>
            Weight: (kg)
          </Text>
          <TextInput
            style={styles.inputBox}
            keyboardType="decimal-pad"
            placeholderTextColor="#a1a3a0"
            onChangeText={(value) => {
              this.setState({weight: value.trim().replace(/\s+/g, '')});
            }}></TextInput>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            styles.shadow,
            {backgroundColor: '#aad326', marginTop: '8%', alignSelf: 'center'},
          ]}
          onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <SuccessDialogue visible={showSucess} type={'Weight'} />
      </View>
    );
  }
}

function RenderDateTime({date, calendarVisible, setDate, setCalendarVisible}) {
  const [dateSelected, setDateSelected] = useState(date);
  return (
    <View>
      <Text style={styles.inputHeader}>Record Date Time:</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={[styles.inputBox, {width: 260}]}
          value={Moment(dateSelected).format('MMMM Do YYYY, h:mm a')}
          placeholderTextColor="#a1a3a0"></TextInput>
        <Ionicons
          name="calendar-outline"
          size={30}
          style={{marginTop: '4%', marginStart: '4%'}}
          onPress={() => {
            setCalendarVisible();
          }}
        />
      </View>
      {calendarVisible && (
        <DatePicker
          visible={calendarVisible}
          date={dateSelected}
          onDateChange={(date) => {
            setDateSelected(date);
            setDate(date);
          }}
          mode="datetime"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  inputHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#133d2c',
  },
  inputBox: {
    width: 300,
    height: 40,
    backgroundColor: '#EEF3BD',
    paddingStart: 30, //position placeholder text
    marginVertical: 10,
    marginEnd: '3%',
    fontSize: 17,
  },
  button: {
    marginTop: '4%',
    backgroundColor: '#EEF3BD',
    width: 300,
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
