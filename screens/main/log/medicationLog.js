import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
//third party library
import Entypo from 'react-native-vector-icons/Entypo';
//functions
import {handleSubmitMedication} from '../../../commonFunctions/logFunctions';
//components
import SuccessDialogue from '../../../components/successDialogue';
import MedicationLogBlock from '../../../components/logs/medication/medicationLogBlock';

Entypo.loadFont();

const MedicationLog = (props) => {
  const [date, setDate] = useState(new Date());
  const [selectedMedicationList, setSelectedMedicationList] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const onListChange = (list) => {
    setSelectedMedicationList([...list]);
  };

  const handleSubmit = async () => {
    if (await handleSubmitMedication(date, selectedMedicationList)) {
      setShowSuccess(true);
    }
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={{marginStart: '7%', marginEnd: '7%'}}>
        <MedicationLogBlock
          date={date}
          setDate={setDate}
          selectedMedicationList={selectedMedicationList}
          onListChange={onListChange}
        />
        {selectedMedicationList.length !== 0 && (
          <TouchableOpacity
            style={[styles.button, styles.shadow, {backgroundColor: '#aad326'}]}
            onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
      <SuccessDialogue visible={showSuccess} type="Medication" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: '4%',
    backgroundColor: '#EEF3BD',
    flex: 1,
    paddingStart: '20%',
    paddingEnd: '20%',
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

export default MedicationLog;
