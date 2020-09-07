import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
//functions
import {
  checkWeight,
  handleSubmitWeight,
} from '../../../commonFunctions/logFunctions';
//components
import SuccessDialogue from '../../../components/successDialogue';
import WeightLogBlock from '../../../components/logs/weight/weightLogBlock';
//styles
import globalStyles from '../../../styles/globalStyles';

const WeightLog = (props) => {
  const [date, setDate] = useState(new Date());
  const [weight, setWeight] = useState('');
  const [successShow, setSuccessShow] = useState(false);

  const handleSubmit = async () => {
    if (await handleSubmitWeight(date, weight)) {
      setSuccessShow(true);
    }
  };

  return (
    <View style={globalStyles.screen}>
      <WeightLogBlock
        date={date}
        setDate={setDate}
        weight={weight}
        setWeight={setWeight}
      />

      {checkWeight(weight) && (
        <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
          <Text style={globalStyles.buttonText}>Submit</Text>
        </TouchableOpacity>
      )}

      <SuccessDialogue visible={successShow} type="Weight" />
    </View>
  );
};

export default WeightLog;
