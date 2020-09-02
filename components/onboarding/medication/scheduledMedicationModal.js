import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
//third party libaray
import Modal from 'react-native-modal';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons';
//component
import DeleteConfirmation from './deleteConfirmation';
import globalStyles from '../../../styles/globalStyles';
import {Colors} from '../../../styles/colors';

const ScheduledMedicationModal = (props) => {
  const {isVisible, closeModal} = props;
  const {medicationList, date} = props;
  const dateString = moment(date.dateString, 'YYYY-MM-DD').format(
    'Do MMMM  YYYY',
  );
  const navigation = useNavigation();
  //delete modal
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [toDelete, setToDelete] = useState({});

  const handleCloseDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const handleDelete = (item) => {
    console.log('show delete confirmation');
    setDeleteModalVisible(true);
    setToDelete(item);
  };

  const handleAdd = () => {
    closeModal();
    navigation.navigate('AddPlan', {fromAddPlanDate: date.dateString});
  };

  return (
    <Modal
      isVisible={isVisible}
      coverScreen={true}
      backdropOpacity={1}
      backdropColor={Colors.backgroundColor}>
      <View style={styles.scheduledContainer}>
        <Entypo
          name="chevron-thin-down"
          onPress={closeModal}
          size={30}
          style={globalStyles.backArrowStyle}
        />
        <Text style={styles.header}>{dateString}</Text>
        <Text style={styles.details}>Scheduled Medications:</Text>
        {medicationList === undefined ? (
          <Text style={styles.miss}>No Medication Set Yet</Text>
        ) : medicationList.length === 0 ? (
          <Text style={styles.miss}>No Medication Set Yet</Text>
        ) : (
          <>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={medicationList}
              style={{flexGrow: 0}}
              renderItem={({item}) => (
                <>
                  <MedicationAdded
                    medication={item}
                    handleDelete={handleDelete}
                  />
                </>
              )}
            />
            {deleteModalVisible ? (
              <Modal
                isVisible={deleteModalVisible}
                onBackdropPress={handleCloseDeleteModal}
                onBackButtonPress={handleCloseDeleteModal}>
                <View style={styles.deleteContainer}>
                  <DeleteConfirmation
                    medication={toDelete}
                    date={date}
                    closeSelf={handleCloseDeleteModal}
                    closeParent={closeModal}
                  />
                </View>
              </Modal>
            ) : null}
          </>
        )}
        <TouchableOpacity onPress={handleAdd}>
          <Text style={styles.addbutton}>Add Medication</Text>
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <View style={[globalStyles.buttonContainer]}>
          <TouchableOpacity
            style={globalStyles.nextButtonStyle}
            onPress={closeModal}>
            <Text style={globalStyles.actionButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

function MedicationAdded({medication, handleDelete}) {
  return (
    <View style={{flexDirection: 'row', borderBottomWidth: 0.2}}>
      <View style={styles.medicationItem}>
        <Text style={styles.medicationName}>{medication.drugName}</Text>
        <Text style={styles.medicationDetail}>{medication.dosage} Unit(s)</Text>
        <Text style={styles.medicationDetail}>
          {medication.perDay} Times(s) Per Day
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteMedication}
        onPress={() => handleDelete(medication)}>
        <Ionicon name="ios-trash-bin" size={40} color="#ff0844" />
      </TouchableOpacity>
    </View>
  );
}

export default ScheduledMedicationModal;

const styles = StyleSheet.create({
  scheduledContainer: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  deleteContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: '4%',
    marginStart: '4%',
  },
  details: {
    fontSize: 18,
    margin: '4%',
    fontWeight: '600',
    color: '#3c3c43',
  },
  medicationItem: {
    marginTop: '2%',
    marginStart: '4%',
    marginBottom: '4%',
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
    padding: '3%',
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
    margin: '4%',
  },
  addbutton: {
    flexDirection: 'row',
    margin: '4%',
    color: '#aad326',
    fontSize: 20,
  },
});
