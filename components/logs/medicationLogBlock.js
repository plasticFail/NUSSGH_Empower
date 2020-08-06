import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import Moment from 'moment';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';
import DateSelectionBlock from '../logs/dateSelectionBlock';

// content
import SelectMedicationModalContent from '../../screens/main/log/medication/selectMedicationModalContent';
import EditMedicationModalContent from '../../screens/main/log/medication/editMedicationModalContent';

Entypo.loadFont();

export default class MedicationLogBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      calendarVisible: this.props.calendarVisible,
      selectedMedicationList: this.props.selectedMedicationList,
      selectModalOpen: this.props.selectModalOpen,
      editModalOpen: this.props.editModalOpen,
      medicineToEdit: this.props.medicineToEdit,
      showSuccess: false,
    };
    this.setDate = this.setDate.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getMedicineToEdit = this.getMedicineToEdit.bind(this);
    this.getSelectedMedicineFromModal = this.getSelectedMedicineFromModal.bind(
      this,
    );
  }

  setDate(date) {
    this.setState({date: date});
    this.props.getDateSelected(date);
    console.log(this.state.date);
  }

  getSelectedMedicineFromModal(medicineObj) {
    console.log('Setting selected medication: ' + medicineObj);
    let list = this.state.selectedMedicationList;
    list.push(medicineObj);
    this.setState({selectModalOpen: false, selectedMedicationList: list});
    console.log(list);
    console.log('----' + this.state.date);

    //send to component using the block to render submit/next
    this.props.getMedicationList(this.state.selectedMedicationList);
  }

  closeModal() {
    console.log('Closing Modal');
    this.setState({selectModalOpen: !this.state.selectModalOpen});
  }

  openEditModal(item) {
    console.log('Opening Edit Modal');
    this.setState({editModalOpen: true});
    console.log('Setting Edit object: ' + item);
    this.setState({medicineToEdit: item});
  }

  handleDelete(item) {
    let list = this.state.selectedMedicationList;
    this.setState({
      selectedMedicationList: list.filter((medication) => medication != item),
    });
    //send to component using the block to render submit/next
    this.props.getMedicationList(
      list.filter((medication) => medication != item),
    );
  }

  //get and edit new dosage to medicine
  getMedicineToEdit(medicineToEdit, newDosage) {
    console.log('Editing: ' + medicineToEdit + ' New Dosage: ' + newDosage);
    if (newDosage == '') {
      Alert.alert('Error', 'Dosage not filled', [{text: 'Got It'}]);
    } else if (
      newDosage.length != 0 &&
      !newDosage.includes('.') &&
      !newDosage.includes('-') &&
      !newDosage.includes(',') &&
      Number(newDosage) <= 5 &&
      Number(newDosage) > 0
    ) {
      const elementIndex = this.state.selectedMedicationList.findIndex(
        (element) => element.drugName == medicineToEdit,
      );
      let newArr = [...this.state.selectedMedicationList];
      newArr[elementIndex] = {
        ...newArr[elementIndex],
        dosage: Number(newDosage),
      };
      this.setState({editModalOpen: false, selectedMedicationList: newArr});
      //send to component using the block to render submit/next
      this.props.getMedicationList(newArr);
    } else {
      Alert.alert('Error', 'Invalid Dosage', [{text: 'Got It'}]);
    }
  }

  render() {
    const {
      date,
      selectedMedicationList,
      selectModalOpen,
      editModalOpen,
      medicineToEdit,
      showSuccess,
    } = this.state;
    return (
      <View style={{flex: 1, width: '100%'}}>
        <DateSelectionBlock date={date} setDate={this.setDate} />
        {selectedMedicationList <= 0 ? (
          <Text style={styles.headerStyle}>Start Adding A Medication:</Text>
        ) : (
          <Text style={styles.headerStyle}>Medication Added:</Text>
        )}

        {
          //render selected medication
          selectedMedicationList.map((item) => {
            return (
              <MedicationAdded
                medication={item}
                handleDelete={() => this.handleDelete(item)}
                openEditModal={() => this.openEditModal(item)}
              />
            );
          })
        }
        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          onPress={() => this.setState({selectModalOpen: true})}>
          <Text style={styles.buttonText}>Add Medicine</Text>
        </TouchableOpacity>

        {/* Select Medicine Modal*/}
        <Modal
          isVisible={selectModalOpen}
          animationIn="slideInUp"
          onBackdropPress={() => this.setState({selectModalOpen: false})}
          onBackButtonPress={() => this.setState({selectModalOpen: false})}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Select Medicine</Text>
              <Entypo
                name="cross"
                size={30}
                style={{marginTop: '1%', marginStart: '20%'}}
                onPress={() => this.setState({selectModalOpen: false})}
              />
            </View>
          </View>
          <SelectMedicationModalContent
            setMedicine={this.getSelectedMedicineFromModal}
            selectedMedicationList={selectedMedicationList}
          />
        </Modal>
        {/* Edit Medicine (Dosage) Modal*/}
        <Modal
          isVisible={editModalOpen}
          animationIn="slideInUp"
          onBackdropPress={() => this.setState({editModalOpen: false})}
          onBackButtonPress={() => this.setState({editModalOpen: false})}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Edit Medicine</Text>
              <Entypo
                name="cross"
                size={30}
                style={{marginTop: '1%', marginStart: '20%'}}
                onPress={() => this.setState({editModalOpen: false})}
              />
            </View>
            <EditMedicationModalContent
              medicineToEdit={medicineToEdit}
              editMedicine={this.getMedicineToEdit}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

function MedicationAdded({medication, handleDelete, openEditModal}) {
  return (
    <View>
      <Entypo
        name="circle-with-cross"
        color={'red'}
        size={30}
        style={{
          alignSelf: 'flex-end',
          marginEnd: '4%',
          position: 'absolute',
          zIndex: 2,
          elevation: 2,
        }}
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
});
