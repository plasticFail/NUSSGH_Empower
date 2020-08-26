import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
//third party libaray
import Modal from 'react-native-modal';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import DeleteConfirmation from './deleteConfirmation';

Entypo.loadFont();

const ScheduledMedicationModal = (props) => {
  const {isVisible, closeModal} = props;
  const {medicationList, date} = props;
  const dateString = moment(date.dateString, 'YYYY-MM-DD').format(
    'Do MMMM  YYYY',
  );
  const navigation = useNavigation();
  //delete modal
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDelete = () => {
    console.log('show delete confirmation');
  };

  const handleAdd = () => {
    closeModal();
    navigation.navigate('AddPlan');
  };

  return (
    <>
      <Modal isVisible={isVisible}>
        <View style={styles.scheduledContainer}>
          <Text style={styles.header}>{dateString}</Text>
          <Text style={styles.details}>Scheduled Medications:</Text>
          {medicationList === undefined ? (
            <Text style={styles.miss}>No Medication Set Yet</Text>
          ) : (
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={medicationList}
              renderItem={({item}) => (
                <MedicationAdded
                  medication={item}
                  handleDelete={handleDelete}
                />
              )}
            />
          )}
          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <DeleteConfirmation />
    </>
  );
};

function MedicationAdded({medication, handleDelete}) {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={styles.medicationItem}>
        <Text style={styles.medicationName}>{medication.drugName}</Text>
        <Text style={styles.medicationDetail}>{medication.dosage} Unit(s)</Text>
        <Text style={styles.medicationDetail}>
          {medication.perDay} Times(s) Per Day
        </Text>
      </View>
      <TouchableOpacity style={styles.deleteMedication} onPress={handleDelete}>
        <Entypo name="cross" size={60} color="red" />
      </TouchableOpacity>
    </View>
  );
}

export default ScheduledMedicationModal;

const styles = StyleSheet.create({
  scheduledContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: '4%',
    marginStart: '4%',
  },
  details: {
    fontSize: 16,
    margin: '4%',
  },
  medicationItem: {
    backgroundColor: '#cacfdb',
    padding: '3%',
    marginTop: '2%',
    marginStart: '4%',
    marginBottom: '4%',
    borderTopStartRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    flex: 4,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: '700',
  },
  medicationDetail: {
    fontSize: 16,
    marginTop: '2%',
  },
  deleteMedication: {
    backgroundColor: '#cacfdb',
    padding: '3%',
    marginTop: '2%',
    marginStart: '1%',
    marginEnd: '4%',
    marginBottom: '4%',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#aad326',
    height: 45,
    width: '70%',
    alignSelf: 'center',
    borderRadius: 15,
    margin: '4%',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: '3%',
    fontWeight: '700',
  },
  backText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
    color: '#aad326',
    marginBottom: '4%',
  },
  miss: {
    fontSize: 18,
    fontWeight: '600',
    color: 'red',
    alignSelf: 'center',
  },
});
