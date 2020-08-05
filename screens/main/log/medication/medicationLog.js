import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Image, Alert} from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker';
import Moment from 'moment';
import {
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native-gesture-handler';
import SelectMedicationModalContent from './selectMedicationModalContent';
import EditMedicationModalContent from './editMedicationModalContent';
import {uploadMedicationLog} from '../logRequestFunctions';
import SuccessDialogue from '../../../../components/successDialogue';

Entypo.loadFont();

export default class MedicationLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      selectedMedicationList: [],
      calendarVisible: false,
      selectModalOpen: false,
      editModalOpen: false,
      medicineToEdit: {},
      showSuccess: false,
    };
    this.getSelectedMedicineFromModal = this.getSelectedMedicineFromModal.bind(
      this,
    );
    this.setDate = this.setDate.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getMedicineToEdit = this.getMedicineToEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setCalendarVisible() {
    this.setState({calendarVisible: !this.state.calendarVisible});
  }

  setDate(date) {
    this.setState({date: date});
    console.log(this.state.date);
  }

  //get and add selected medicine
  getSelectedMedicineFromModal(medicineObj) {
    console.log('Setting selected medication: ' + medicineObj);
    let list = this.state.selectedMedicationList;
    list.push(medicineObj);
    this.setState({selectModalOpen: false, selectedMedicationList: list});
    console.log(list);
    console.log('----' + this.state.date);
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
      !newDosage.includes(',')
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
    } else {
      Alert.alert('Error', 'Invalid Dosage', [{text: 'Got It'}]);
    }
  }

  handleSubmit() {
    console.log('In submit');
    var format = 'hh:mm';
    var timeNow = Moment(new Date(), format);
    var timeInput = Moment(this.state.date, format);
    //check date valid (not in the future)
    if (this.state.date.toDateString() != new Date().toDateString()) {
      Alert.alert(
        'Error',
        'Invalid date. Make sure date selected is not after today. ',
        [{text: 'Got It'}],
      );
    } else if (timeInput.isBefore(timeNow) || timeInput.isSame(timeNow)) {
      for (var x of this.state.selectedMedicationList) {
        x.recordDate = Moment(this.state.date).format('DD/MM/YYYY HH:mm:ss');
      }

      this.state.selectedMedicationList.map(function (item) {
        delete item.image_url;
        return item;
      });

      console.log(this.state.selectedMedicationList);

      uploadMedicationLog(this.state.selectedMedicationList).then((value) => {
        if (value == true) {
          this.setState({showSuccess: true});
        } else {
          Alert.alert('Error', 'Unexpected Error Occured', [
            {text: 'Try again later'},
          ]);
        }
      });
    } else {
      Alert.alert(
        'Error',
        'Invalid time. Make sure time selected is not after the current time now ',
        [{text: 'Got It'}],
      );
    }
  }

  render() {
    const {
      date,
      calendarVisible,
      selectedMedicationList,
      selectModalOpen,
      editModalOpen,
      medicineToEdit,
      showSuccess,
    } = this.state;
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <RenderDateTime
          date={date}
          calendarVisible={calendarVisible}
          setDate={this.setDate}
          setCalendarVisible={() => this.setCalendarVisible(calendarVisible)}
        />
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
        {this.state.selectedMedicationList != 0 && (
          <TouchableOpacity
            style={[styles.button, styles.shadow, {backgroundColor: '#aad326'}]}
            onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        )}

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
        <SuccessDialogue visible={showSuccess} type="Medication" />
      </ScrollView>
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
          <View style={{flex: 4, padding: '3%'}}>
            <Text style={[styles.addedMedicationText]}>
              {medication.drugName}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.addedMedicationText, {color: '#ca17d4'}]}>
                {medication.dosage} Unit (s)
              </Text>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    width: 90,
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

function RenderDateTime({date, calendarVisible, setDate, setCalendarVisible}) {
  const [dateSelected, setDateSelected] = useState(date);
  return (
    <View
      style={{
        marginTop: '7%',
        marginStart: '5%',
        justifyContent: 'space-around',
      }}>
      <Text style={styles.inputHeader}>Record Date Time:</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.inputBox}
          value={Moment(dateSelected).format('MMMM Do YYYY, h:mm a')}
          placeholderTextColor="#a1a3a0"></TextInput>
        <Ionicons
          name="calendar-outline"
          size={30}
          style={{marginTop: '4%', marginStart: '4%'}}
          onPress={() => {
            setCalendarVisible();
          }}
        />
      </View>
      {calendarVisible && (
        <DatePicker
          visible={calendarVisible}
          date={dateSelected}
          onDateChange={(date) => {
            setDateSelected(date);
            setDate(date);
          }}
          mode="datetime"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#133d2c',
    marginBottom: '4%',
    marginTop: '5%',
    marginStart: '7%',
  },
  inputHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#133d2c',
  },
  inputBox: {
    width: 300,
    height: 40,
    backgroundColor: '#EEF3BD',
    paddingStart: 30, //position placeholder text
    marginVertical: 10,
    marginEnd: '3%',
    fontSize: 17,
  },
  button: {
    marginTop: '4%',
    backgroundColor: '#EEF3BD',
    width: 300,
    height: 40,
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
  },
  medicineImg: {
    width: 100,
    height: 100,
    margin: '3%',
  },
  addedMedicationText: {
    fontSize: 19,
    marginBottom: '2%',
    flex: 2,
    flexWrap: 'wrap',
    fontWeight: '600',
  },
});
