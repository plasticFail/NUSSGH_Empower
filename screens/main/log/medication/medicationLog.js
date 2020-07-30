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
    };
    this.addMedication = this.addMedication.bind(this);
  }

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

  componentDidUpdate() {
    console.log(this.state.selectedMedicationList);
  }

  render() {
    const {
      date,
      selectedMedicine,
      selectedDosage,
      calendarVisible,
      modalOpen,
      editModalOpen,
      successShow,
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
              value={Moment(date).format('MMMM Do YYYY, h:mm:ss a')}
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
                    // Handle delete for this food item in the cart.
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
                onPress={() => this.setState({successShow: true})}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            )}
            <SuccessDialogue visible={successShow} type="Medication" />
          </View>
        </View>

        <View style={{flex: 1}}>
          <Modal
            isVisible={modalOpen}
            animationIn="slideInUp"
            onBackdropPress={() => this.setState({modalOpen: false})}
            onBackButtonPress={() => this.setState({modalOpen: false})}
            style={{backgroundColor: 'white'}}>
            <View style={styles.header}>
              <Entypo
                name="cross"
                size={30}
                onPress={() => this.setState({modalOpen: false})}
              />
              <Text style={{fontWeight: '500', fontSize: 20}}>
                Select Medicine
              </Text>
            </View>
            <View style={{flex: 3, alignItems: 'center'}}>
              <View style={{marginTop: '7%'}}>
                <Text style={{fontWeight: '500', fontSize: 20}}>Name:</Text>
                <DropDownPicker
                  searchable={true}
                  searchablePlaceholder="Search for a medication"
                  items={[
                    {
                      label: 'Metformin - 1000 mg',
                      value: 'id_1',
                      icon: () => (
                        <Image
                          source={{
                            uri:
                              'https://img.medscapestatic.com/pi/features/drugdirectory/octupdate/AMN02200.jpg',
                          }}
                          style={{height: 50, width: 50}}
                        />
                      ),
                    },
                    {
                      label: 'Metformin - 500 mg',
                      value: 'id_2',
                      icon: () => (
                        <Image
                          source={{
                            uri:
                              'https://img.medscapestatic.com/pi/features/drugdirectory/octupdate/GLN01590.jpg',
                          }}
                          style={{height: 50, width: 50}}
                        />
                      ),
                    },
                  ]}
                  containerStyle={{
                    height: 60,
                    width: 300,
                    marginTop: '3%',
                    backgroundColor: 'white',
                  }}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  activeLabelStyle={{color: 'red'}}
                  onChangeItem={(item) => {
                    this.setState({selectedMedicine: item});
                  }}
                />
                <View style={{marginTop: '7%'}}>
                  <Text style={{fontWeight: '500', fontSize: 20}}>Dosage:</Text>
                  <View style={{flexDirection: 'row'}}>
                    <TextInput
                      style={styles.inputBox}
                      placeholder=""
                      placeholderTextColor="#a1a3a0"
                      onChangeText={(value) =>
                        this.setState({selectedDosage: value})
                      }
                    />
                    <Text
                      style={{
                        borderRadius: 20,
                        borderWidth: 3,
                        borderColor: '#AAd326',
                        padding: 15,
                        fontSize: 17,
                      }}>
                      Unit (s)
                    </Text>
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
            <View style={styles.header}>
              <Entypo
                name="cross"
                size={30}
                onPress={() => this.setState({editModalOpen: false})}
              />
              <Text style={{fontWeight: '500', fontSize: 20}}>
                Edit Medicine
              </Text>
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
                  <Text
                    style={{
                      borderRadius: 20,
                      borderWidth: 3,
                      borderColor: '#AAd326',
                      padding: 15,
                      fontSize: 17,
                    }}>
                    Unit (s)
                  </Text>
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
          </Modal>
        </View>
      </ScrollView>
    );
  }
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
    width: 250,
    height: 40,
    backgroundColor: '#EEF3BD',
    paddingStart: 30, //position placeholder text
    marginVertical: 10,
  },
  button: {
    marginTop: '7%',
    backgroundColor: '#EEF3BD',
    width: 300,
    height: 40,
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 6,
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
