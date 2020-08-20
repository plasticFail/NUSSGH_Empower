import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
//functions
import {handleSubmitWeight} from '../../../commonFunctions/logFunctions';
//components
import SuccessDialogue from '../../../components/successDialogue';
import WeightLogBlock from '../../../components/logs/weightLogBlock';


const WeightLog = (props) => {
  const [date, setDate] = useState(new Date());
  const [weight, setWeight] = useState('');
  const [successShow, setSuccessShow] = useState(false);

  const handleSubmit = async() => {
    if(await handleSubmitWeight(date, weight)){
      setSuccessShow(true);
    }
  };

  return (
    <View style={styles.screen}>
      <WeightLogBlock
        date={date}
        setDate={setDate}
        weight={weight}
        setWeight={setWeight}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <SuccessDialogue visible={successShow} type="Weight" />
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

export default WeightLog;
