import React from 'react';
import {View, Text, StyleSheet, TextInput, Image, Alert} from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import Moment from 'moment';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import DropDownPicker from 'react-native-dropdown-picker';
import SuccessDialogue from '../../../../components/successDialogue';
import {getMedications} from '../../../../storage/asyncStorageFunctions';
import {storeMedications} from '../logRequestFunctions';
import AsyncStorage from '@react-native-community/async-storage';
import {medicationList} from '../../../../netcalls/urls';
import Loading from '../../../../components/loading';

Entypo.loadFont();

export default class MedicationLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      selectedMedicine: {},
      selectedDosage: '',
      selectedMedicationList: [],
      calendarVisible: false,
      modalOpen: false,
      editModalOpen: false,
      successShow: false,
      searchMedicineQuery: '',
      medicationResult: [],
      isLoading: false,
    };
    this.timeout = setTimeout(() => {}, 0);
    this.addMedication = this.addMedication.bind(this);
  }

  searchMedicine = (text) => {
    // handler for making lazy requests.
    if (text === '') {
      clearTimeout(this.timeout);
      this.setState({
        searchMedicineQuery: text,
        isLoading: false,
        medicationResult: [],
      });
    } else {
      // Do lazy loading
      this.setState(
        {
          searchMedicineQuery: text,
          isLoading: true,
        },
        () => {
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            setTimeout(() => {
              this.setState({
                isLoading: false,
              });
            }, 1000); // simulate 1s for fetching request.
            // Format to fetch the data
            storeMedications();
            getMedications().then((response) => {
              let arr = [];
              for (var x in response) {
                arr.push(x);
              }
            });
          }, 500); // 500ms delay before loading API.
        },
      );
    }
  };

  addMedication = (selectedMedicine, selectedDosage) => {
    this.props.navigation.navigate('MedicationLog');
    let list = this.state.selectedMedicationList;
    list.push({name: selectedMedicine.label, dosage: selectedDosage});
    this.setState({modalOpen: false, selectedMedicationList: list});
  };

  editMedication = (selectedMedicine, selectedDosage) => {
    this.props.navigation.navigate('MedicationLog');
    const elementIndex = this.state.selectedMedicationList.findIndex(
      (element) => element.name == selectedMedicine.name,
    );
    console.log(elementIndex);
    let newArr = [...this.state.selectedMedicationList];
    newArr[elementIndex] = {...newArr[elementIndex], dosage: selectedDosage};
    this.setState({selectedMedicationList: newArr, editModalOpen: false});
  };

  handleDelete = (item) => {
    let list = this.state.selectedMedicationList;
    this.setState({
      selectedMedicationList: list.filter((medication) => medication != item),
    });
  };

  handleEdit = (item) => {
    this.setState({
      editModalOpen: true,
      selectedMedicine: item,
      selectedDosage: item.dosage,
    });
  };

  handleSubmit = () => {
    this.setState({successShow: true});
  };

  render() {
    const {
      date,
      selectedMedicine,
      selectedDosage,
      calendarVisible,
      modalOpen,
      editModalOpen,
      successShow,
      isLoading,
      searchMedicineQuery,
    } = this.state;
    const {navigation} = this.props;

    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <View style={{marginTop: '7%'}}>
          <Text style={styles.inputHeader}>Record Date Time:</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.inputBox1}
              value={Moment(date).format('MMMM Do YYYY, h:mm a')}
              placeholderTextColor="#a1a3a0"></TextInput>
            <Ionicons
              name="calendar-outline"
              size={20}
              style={{marginTop: '7%', marginStart: '7%'}}
              onPress={() => {
                this.setState({calendarVisible: !calendarVisible});
              }}
            />
          </View>
          {calendarVisible && (
            <DatePicker
              visible={calendarVisible}
              date={date}
              onDateChange={(date) => this.setState({date: date})}
              mode="datetime"
            />
          )}
          <View style={{marginTop: '7%'}}>
            {this.state.selectedMedicationList <= 0 ? (
              <Text style={{fontSize: 20, fontWeight: '600', color: '#133d2c'}}>
                Start Adding A Medication:
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: '#133d2c',
                  marginBottom: '4%',
                }}>
                Medication Added:
              </Text>
            )}
            {
              // Render medication addded
              this.state.selectedMedicationList.map((item) => (
                <MedicationAdded
                  medication={item}
                  handleDelete={() => {
                    this.handleDelete(item);
                  }}
                  handleEdit={() => {
                    this.handleEdit(item);
                  }}
                />
              ))
            }
            <TouchableOpacity
              style={[styles.button, styles.shadow]}
              onPress={() => this.setState({modalOpen: true})}>
              <Text style={styles.buttonText}>Add Medicine</Text>
            </TouchableOpacity>
            {this.state.selectedMedicationList != 0 && (
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.shadow,
                  {backgroundColor: '#aad326'},
                ]}
                onPress={this.handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            )}
            <SuccessDialogue visible={successShow} type="Medication" />
          </View>
        </View>
        {/* Select Medicine Pop up*/}
        <View style={{flex: 1}}>
          <Modal
            isVisible={modalOpen}
            animationIn="slideInUp"
            onBackdropPress={() => this.setState({modalOpen: false})}
            onBackButtonPress={() => this.setState({modalOpen: false})}
            style={{backgroundColor: 'white'}}>
            <View style={{flex: 1}}>
              <View
                style={
                  (styles.header,
                  {flexDirection: 'row', backgroundColor: '#aad326'})
                }>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 20,
                    marginStart: '30%',
                    marginTop: '2%',
                    flex: 5,
                  }}>
                  Select Medicine
                </Text>
                <Entypo
                  name="cross"
                  size={30}
                  style={{flex: 1, marginTop: '2%'}}
                  onPress={() => this.setState({modalOpen: false})}
                />
              </View>
              <View style={{flex: 3, alignItems: 'center'}}>
                <View style={{marginTop: '7%'}}>
                  <Text style={{fontWeight: '500', fontSize: 20}}>Name:</Text>
                  <TextInput
                    style={[styles.inputBox, {width: 300}]}
                    placeholder=""
                    placeholderTextColor="#a1a3a0"
                    onChangeText={(value) => {
                      this.searchMedicine(value);
                    }}
                  />
                  <Loading isLoading={isLoading} />
                </View>
                <View style={{marginTop: '7%'}}>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 20,
                    }}>
                    Dosage:
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <TextInput
                      style={styles.inputBox}
                      placeholder=""
                      placeholderTextColor="#a1a3a0"
                      onChangeText={(value) =>
                        this.setState({selectedDosage: value})
                      }
                    />
                    <View
                      style={{
                        borderRadius: 20,
                        borderWidth: 3,
                        borderColor: '#AAd326',
                        padding: 15,
                        alignItems: 'center',
                      }}>
                      <Text style={{fontSize: 20}}>Unit (s)</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    style={[styles.button, {backgroundColor: '#aad326'}]}
                    onPress={() =>
                      this.addMedication(selectedMedicine, selectedDosage)
                    }>
                    <Text style={styles.buttonText}>Add Medicine</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View style={{flex: 1}}>
          <Modal
            isVisible={editModalOpen}
            animationIn="slideInUp"
            onBackdropPress={() => this.setState({editModalOpen: false})}
            onBackButtonPress={() => this.setState({editModalOpen: false})}
            style={{backgroundColor: 'white'}}>
            <View style={{flex: 1}}>
              <View
                style={
                  (styles.header,
                  {flexDirection: 'row', flex: 3, backgroundColor: '#aad326'})
                }>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 20,
                    marginStart: '30%',
                    marginTop: '2%',
                    flex: 5,
                  }}>
                  Edit Medicine
                </Text>
                <Entypo
                  name="cross"
                  size={30}
                  style={{flex: 1, marginTop: '2%'}}
                  onPress={() => this.setState({edi: false})}
                />
              </View>
              <View style={{flex: 3, alignItems: 'center'}}>
                <View style={{marginTop: '7%'}}>
                  <Text style={{fontWeight: '500', fontSize: 20}}>
                    {selectedMedicine.name}
                  </Text>
                </View>
                <View style={{marginTop: '7%'}}>
                  <Text style={{fontWeight: '500', fontSize: 20}}>Dosage:</Text>
                  <View style={{flexDirection: 'row'}}>
                    <TextInput
                      style={styles.inputBox}
                      value={selectedDosage}
                      placeholderTextColor="#a1a3a0"
                      onChangeText={(value) =>
                        this.setState({selectedDosage: value})
                      }
                    />
                    <View
                      style={{
                        borderRadius: 20,
                        borderWidth: 3,
                        borderColor: '#AAd326',
                        padding: 15,
                        alignItems: 'center',
                      }}>
                      <Text style={{fontSize: 20}}>Unit (s)</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[styles.button, {backgroundColor: '#aad326'}]}
                    onPress={() =>
                      this.editMedication(selectedMedicine, selectedDosage)
                    }>
                    <Text style={styles.buttonText}>Save Changes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    );
  }
}

function SearchResults({}) {
  return;
}

function MedicationAdded({medication, handleDelete, handleEdit}) {
  return (
    <View style={[styles.addedMedicationView, styles.shadow]}>
      <View style={{flex: 3}}>
        <Text>{medication.name}</Text>
        <Text>{medication.dosage} Units</Text>
      </View>
      <View style={{alignSelf: 'flex-end'}}>
        <Entypo
          name="circle-with-cross"
          color="#ff0000"
          style={{marginBottom: '20%'}}
          onPress={handleDelete}
          size={20}
        />
        <Entypo
          name="edit"
          color="black"
          style={{marginBottom: '20%'}}
          onPress={handleEdit}
          size={20}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputHeader: {
    fontSize: 18,
    fontWeight: '500',
  },
  inputBox: {
    width: 200,
    height: 40,
    backgroundColor: '#EEF3BD',
    paddingStart: 30, //position placeholder text
    marginVertical: 10,
    marginEnd: '3%',
  },
  inputBox1: {
    width: 300,
    height: 40,
    backgroundColor: '#EEF3BD',
    paddingStart: 30, //position placeholder text
    marginVertical: 10,
    fontSize: 19,
  },
  button: {
    marginTop: '7%',
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
  header: {
    flex: 0.2,
    flexDirection: 'row',
    backgroundColor: '#aad326',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  addedMedicationView: {
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginBottom: '3%',
    flexDirection: 'row',
  },
});
