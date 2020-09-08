import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
//third party libs
import Moment from 'moment';
import {useNavigation} from '@react-navigation/native';
//functions
import {
  checkBloodGlucose,
  handleSubmitBloodGlucose,
} from '../../../commonFunctions/logFunctions';
//components
import SuccessDialogue from '../../../components/successDialogue';
import BloodGlucoseLogBlock from '../../../components/logs/bg/bloodGlucoseLogBlock';
import {ScrollView} from 'react-native-gesture-handler';
//styles
import globalStyles from '../../../styles/globalStyles';
import styles from '@twotalltotems/react-native-otp-input/dist/styles';

const BloodGlucoseLog = (props) => {
  const [date, setDate] = useState(new Date());
  const [bloodGlucose, setBloodGlucose] = useState('');
  const [successShow, setSuccessShow] = useState(false);
  const [eatSelection, setEatSelection] = useState(false);
  const [exerciseSelection, setExerciseSelection] = useState(false);
  const [alcoholSelection, setAlcoholSelection] = useState(false);

  Moment.locale('en');

  const handleSubmit = async () => {
    if (await handleSubmitBloodGlucose(date, bloodGlucose)) {
      setSuccessShow(true);
    }
  };

  return (
    <ScrollView style={globalStyles.scrollContainer}>
      <View style={globalStyles.screen}>
        <BloodGlucoseLogBlock
          date={date}
          setDate={setDate}
          bloodGlucose={bloodGlucose}
          setBloodGlucose={setBloodGlucose}
          eatSelection={eatSelection}
          setEatSelection={setEatSelection}
          exerciseSelection={exerciseSelection}
          setExerciseSelection={setExerciseSelection}
          alcoholSelection={alcoholSelection}
          setAlcoholSelection={setAlcoholSelection}
        />

        {checkBloodGlucose(bloodGlucose) && (
          <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
            <Text style={globalStyles.buttonText}>Submit</Text>
          </TouchableOpacity>
        )}

        <SuccessDialogue visible={successShow} type="Blood Glucose" />
      </View>
    </ScrollView>
  );
};

export default BloodGlucoseLog;
