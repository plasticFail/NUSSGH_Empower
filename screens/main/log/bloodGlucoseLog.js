import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
//third party libs
import Moment from 'moment';
import {useNavigation} from '@react-navigation/native';
//functions
import {handleSubmitBloodGlucose} from '../../../commonFunctions/logFunctions';
//components
import SuccessDialogue from '../../../components/successDialogue';
import BloodGlucoseLogBlock from '../../../components/logs/bloodGlucoseLogBlock';


const BloodGlucoseLog = (props) => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [bloodGlucose, setBloodGlucose] = useState('');
  const [successShow, setSuccessShow] = useState(false);
  Moment.locale('en');

  const handleSubmit = async() => {
    if(await handleSubmitBloodGlucose(date, bloodGlucose)){
      if(bloodGlucose === '3.2'){
        navigation.navigate('HypoglycemiaReason');
      }else{
        setSuccessShow(true);
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
