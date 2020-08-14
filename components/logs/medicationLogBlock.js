import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';
import {FlatList} from 'react-native-gesture-handler';

// content
import DateSelectionBlock from '../logs/dateSelectionBlock';
import SelectMedicationModalContent from './selectMedicationModalContent';
import EditMedicationModalContent from './editMedicationModalContent';

// functions
import {checkDosage} from '../../commonFunctions/logFunctions';

Entypo.loadFont();

const MedicationLogBlock = (props) => {
  const [selectModalOpen, setSelectModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [medicineToEdit, setMedicineToEdit] = useState({});

  console.log('---In Medication Log Block');

  const getSelectedMedicineFromModal = (medicineObj) => {
    console.log('Setting selected medication: ' + medicineObj);
    let list = props.selectedMedicationList;
    list.push(medicineObj);
    //set new states
    setSelectModalOpen(false);
    props.onListChange(list);
  };

  const openEditModal = (item) => {
    console.log('Opening Edit Modal');
    setEditModalOpen(true);
    console.log('Setting Edit object: ' + item);
    setMedicineToEdit(item);
  };

  //get and edit new dosage to medicine
  const handleEditMedicine = (medicineToEdit, newDosage) => {
    console.log('Editing: ' + medicineToEdit + ' New Dosage: ' + newDosage);
    if (checkDosage(newDosage)) {
      const elementIndex = props.selectedMedicationList.findIndex(
        (element) => element.drugName == medicineToEdit,
      );
      let newArr = [...props.selectedMedicationList];
      newArr[elementIndex] = {
        ...newArr[elementIndex],
        dosage: Number(newDosage),
      };

      //set state
      setEditModalOpen(false);
      props.onListChange(newArr);
    } else {
      Alert.alert('Error', 'Invalid Dosage', [{text: 'Got It'}]);
    }
  };

  const handleDelete = (item) => {
    let list = props.selectedMedicationList;
    props.onListChange(list.filter((medication) => medication != item));
  };

  return (
    <View style={{flex: 1, width: '100%'}}>
      <DateSelectionBlock date={props.date} setDate={props.setDate} />
      {props.selectedMedicationList <= 0 ? (
        <Text style={styles.headerStyle}>Start Adding A Medication:</Text>
      ) : (
        <Text style={styles.headerStyle}>Medication Added:</Text>
      )}

      <FlatList
        keyExtractor={(item) => item.drugName}
        data={props.selectedMedicationList}
        renderItem={({item}) => (
          <MedicationAdded
            medication={item}
            handleDelete={() => handleDelete(item)}
            openEditModal={() => openEditModal(item)}
          />
        )}
      />

      {/* Select Medicine Modal*/}
      <Modal
        isVisible={selectModalOpen}
        animationIn="slideInUp"
        onBackdropPress={() => setSelectModalOpen(false)}
        onBackButtonPress={() => setSelectModalOpen(false)}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Select Medicine</Text>
            <Entypo
              name="cross"
              size={30}
              style={{marginTop: '1%', marginStart: '20%'}}
              onPress={() => setSelectModalOpen(false)}
            />
          </View>
        </View>
        <SelectMedicationModalContent
          setMedicine={getSelectedMedicineFromModal}
          selectedMedicationList={props.selectedMedicationList}
        />
      </Modal>

      {/* Edit Medicine (Dosage) Modal*/}
      <Modal
        isVisible={editModalOpen}
        animationIn="slideInUp"
        onBackdropPress={() => setEditModalOpen(false)}
        onBackButtonPress={() => setEditModalOpen(false)}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Edit Medicine</Text>
            <Entypo
              name="cross"
              size={30}
              style={{marginTop: '1%', marginStart: '20%'}}
              onPress={() => setEditModalOpen(false)}
            />
          </View>
          <EditMedicationModalContent
            medicineToEdit={medicineToEdit}
            editedMedicine={handleEditMedicine}
          />
        </View>
      </Modal>

      <TouchableOpacity
        style={[styles.button, styles.shadow]}
        onPress={() => setSelectModalOpen(true)}>
        <Text style={styles.buttonText}>Add Medicine</Text>
      </TouchableOpacity>
    </View>
  );
};

function MedicationAdded({medication, handleDelete, openEditModal}) {
  return (
    <View>
      <Entypo
        name="circle-with-cross"
        color={'red'}
        size={30}
        style={styles.deleteIcon}
        onPress={handleDelete}
      />
      <View
        style={[
          styles.addedMedicationView,
          styles.shadow,
          {paddingTop: '3%', zIndex: 1, elevation: 1},
        ]}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={[styles.medicineImg, {flex: 1}]}
            source={{
              uri: medication.image_url,
            }}
          />
          <View style={{flex: 2, padding: '3%'}}>
            <Text style={[styles.addedMedicationText]}>
              {medication.drugName}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.addedMedicationText, {color: '#ca17d4'}]}>
                {medication.dosage} Unit (s)
              </Text>
              <TouchableOpacity
                style={[
                  styles.editButton,
                  {
                    alignSelf: 'flex-end',
                    backgroundColor: '#aad326',
                  },
                ]}
                onPress={openEditModal}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#133d2c',
    marginBottom: '4%',
    marginTop: '5%',
    marginStart: '7%',
  },
  inputHeader: {
    fontSize: 18,
    fontWeight: '500',
  },
  inputBoxFill1: {
    //*diff*//
    flex: 1,
    backgroundColor: '#EEF3BD',
    paddingStart: 13, //position placeholder text
    marginVertical: 10,
    padding: '4%',
    fontSize: 18,
    color: 'black',
  },
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
  editButton: {
    marginTop: '4%',
    backgroundColor: '#EEF3BD',
    flex: 1,
    paddingStart: '5%',
    paddingEnd: '5%',
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
  container: {
    backgroundColor: 'white',
    borderRadius: 3,
  },
  header: {
    backgroundColor: '#aad326',
    padding: '4%',
    flexDirection: 'row',
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 20,
    marginStart: '30%',
    marginTop: '2%',
  },
  addedMedicationView: {
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    padding: 10,
    margin: '3%',
    width: Dimensions.width,
  },
  medicineImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  addedMedicationText: {
    fontSize: 19,
    marginBottom: '2%',
    flex: 2,
    flexWrap: 'wrap',
  },
  deleteIcon: {
    alignSelf: 'flex-end',
    marginEnd: '4%',
    position: 'absolute',
    zIndex: 2,
    elevation: 2,
  },
});

export default MedicationLogBlock;
