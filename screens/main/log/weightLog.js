import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
//third party libs
import Moment from 'moment';
//functions
import {weightAddLogRequest} from '../../../netcalls/requestsLog';
//components
import SuccessDialogue from '../../../components/successDialogue';
import WeightLogBlock from '../../../components/logs/weightLogBlock';


const WeightLog = (props) => {
  const [date, setDate] = useState(new Date());
  const [weight, setWeight] = useState('');
  const [successShow, setSuccessShow] = useState(false);

  const handleSubmit = () =>  {
    //check date valid and weight format (1 dp)
    console.log('---' + Number(weight));
    if (checkTime() && checkInputFormat(weight)) {
      let formatDate = Moment(date).format('DD/MM/YYYY HH:mm:ss');
      weightAddLogRequest(Number(weight), formatDate).then(
          (value) => {
            if (value === true) {
              setSuccessShow(true);
            } else {
              Alert.alert('Error', 'Unexpected Error Occured ', [
                {text: 'Try Again Later'},
              ]);
            }
          },
      );
    }
  }

  const checkTime = () =>  {
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
  }

  const checkInputFormat = () => {
    if (
        weight.match(/^[0-9]+(\.[0-9]{1})?$/g) &&
        !weight.includes(',') &&
        !weight.includes('-') &&
        Number(weight) <= 200 &&
        Number(weight) >= 40
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

  return(
      <ScrollView>
        <View style={styles.screen}>
          <WeightLogBlock date={date} setDate={setDate} weight={weight} setWeight={setWeight}/>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <SuccessDialogue visible={successShow} type="Weight" />
        </View>
      </ScrollView>
  );
}

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

export default WeightLog;
