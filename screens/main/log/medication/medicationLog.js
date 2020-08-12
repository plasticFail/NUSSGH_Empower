import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import {medicationAddLogRequest} from '../../../../netcalls/requestsLog';
import SuccessDialogue from '../../../../components/successDialogue';
import MedicationLogBlock from '../../../../components/logs/medicationLogBlock';
import {checkTime} from '../../../../commonFunctions/logFunctions';

Entypo.loadFont();

const MedicationLog = (props) => {
  const [date, setDate] = useState(new Date());
  const [selectedMedicationList, setSelectedMedicationList] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  console.log('--In Medication Log');

  const onListChange = (list) => {
    setSelectedMedicationList([...list]);
  };

  const handleSubmit = () => {
    if (checkTime(date)) {
      for (var x of selectedMedicationList) {
        x.recordDate = Moment(date).format('DD/MM/YYYY HH:mm:ss');
      }
      selectedMedicationList.map(function (item) {
        delete item.image_url;
        return item;
      });
      console.log(selectedMedicationList);
      medicationAddLogRequest(selectedMedicationList).then((value) => {
        if (value == true) {
          setShowSuccess(true);
        } else {
          Alert.alert('Error', 'Unexpected Error Occured', [
            {text: 'Try again later'},
          ]);
        }
      });
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
        {selectedMedicationList.length != 0 && (
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
    alignSelf: 'stretch',
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
