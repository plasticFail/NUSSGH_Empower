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

Entypo.loadFont();

export default class MedicationLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      selectedMedicationList: [
        {dosage: '2', name: 'Actrapid HM PEN 100 IU/ml (3ml) - INJ'},
      ],
      calendarVisible: false,
      selectModalOpen: false,
      successShow: false,
    };
    console.log(this.state.date);
    this.getSelectedMedicineFromModal = this.getSelectedMedicineFromModal.bind(
      this,
    );
    this.handleDelete = this.handleDelete.bind(this);
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
  }

  closeModal() {
    console.log('Closing Modal');
    this.setState({selectModalOpen: !this.state.selectModalOpen});
  }

  handleDelete = (item) => {
    let list = this.state.selectedMedicationList;
    this.setState({
      selectedMedicationList: list.filter((medication) => medication != item),
    });
  };

  render() {
    const {
      date,
      calendarVisible,
      selectedMedicationList,
      selectModalOpen,
    } = this.state;
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <RenderDateTime
          date={date}
          calendarVisible={calendarVisible}
          setDate={() => this.setDate}
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
            style={[
              styles.button,
              styles.shadow,
              {backgroundColor: '#aad326'},
            ]}>
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
      </ScrollView>
    );
  }
}

function MedicationAdded({medication, handleDelete}) {
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
              uri:
                'https://assets.nst.com.my/images/articles/ondontmiss1_1589162412.jpg',
            }}
          />
          <View style={{flex: 4, padding: '3%'}}>
            <Text style={[styles.addedMedicationText]}>{medication.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.addedMedicationText, {color: '#ca17d4'}]}>
                {medication.dosage} Units
              </Text>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    width: 90,
                    alignSelf: 'flex-end',
                    backgroundColor: '#aad326',
                  },
                ]}>
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
            setDate(dateSelected);
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
    alignSelf: 'center',
    marginTop: '5%',
  },
  inputHeader: {
    fontSize: 18,
    fontWeight: '500',
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
    width: 80,
    height: 80,
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
