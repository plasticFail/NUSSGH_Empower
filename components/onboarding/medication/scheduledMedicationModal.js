import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//third party libaray
import Modal from 'react-native-modal';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
//component
import DeleteConfirmation from './deleteConfirmation';
import CrossBtn from '../../crossBtn';
import MedicationItem from '../../medicationItem';
//styles
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';

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
      style={{margin: 0}}
      backdropColor={Colors.backgroundColor}>
      <View style={{flex: 1}}>
        <View style={globalStyles.menuBarContainer}>
          <CrossBtn close={closeModal} />
        </View>
        <View style={styles.body}>
          <Text
            style={[
              globalStyles.pageHeader,
              {fontSize: 30, marginStart: 0, marginBottom: '4%'},
            ]}>
            {dateString}
          </Text>
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
                    <MedicationItem
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
          <TouchableOpacity onPress={handleAdd} style={{flexDirection: 'row'}}>
            <AntDesign
              name="pluscircleo"
              color={'#aad326'}
              size={25}
              style={{margin: '2%'}}
            />
            <Text style={styles.addbutton}>Add Medication</Text>
          </TouchableOpacity>
        </View>
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
  details: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3c3c43',
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
    marginTop: '2%',
    marginBottom: '2%',
  },
  addbutton: {
    marginStart: '2%',
    color: '#aad326',
    fontSize: 20,
    marginTop: '2%',
  },
  body: {
    marginStart: Dimensions.get('window').width * 0.07,
    marginEnd: Dimensions.get('window').width * 0.07,
  },
});
