import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import {medicationAddLogRequest} from '../../../../netcalls/requestsLog';
import SuccessDialogue from '../../../../components/successDialogue';
import MedicationLogBlock from '../../../../components/logs/medicationLogBlock';

Entypo.loadFont();

export default class MedicationLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMedicationList: [],
      calendarVisible: false,
      selectModalOpen: false,
      editModalOpen: false,
      medicineToEdit: {},
      showSuccess: false,
      date: new Date(),
    };
    this.getMedicationListFromBlock = this.getMedicationListFromBlock.bind(
      this,
    );
    this.getDateSelected = this.getDateSelected.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //get selected list past from the log block
  getMedicationListFromBlock(medicineList) {
    this.setState({selectedMedicationList: medicineList});
    console.log(this.state.selectedMedicationList);
  }

  //get selected date
  getDateSelected(date) {
    this.setState({date: date});
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
        'Invalid date. Make sure date selected is not after or before today. ',
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

      medicationAddLogRequest(this.state.selectedMedicationList).then(
        (value) => {
          if (value == true) {
            this.setState({showSuccess: true});
          } else {
            Alert.alert('Error', 'Unexpected Error Occured', [
              {text: 'Try again later'},
            ]);
          }
        },
      );
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
      calendarVisible,
      selectedMedicationList,
      selectModalOpen,
      editModalOpen,
      medicineToEdit,
      showSuccess,
    } = this.state;
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={{marginStart: '7%', marginEnd: '7%'}}>
          <MedicationLogBlock
            calendarVisible={calendarVisible}
            selectedMedicationList={selectedMedicationList}
            selectModalOpen={selectModalOpen}
            editModalOpen={editModalOpen}
            medicineToEdit={medicineToEdit}
            getMedicationList={this.getMedicationListFromBlock}
            getDateSelected={this.getDateSelected}
          />
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
        </View>
        <SuccessDialogue visible={showSuccess} type="Medication" />
      </ScrollView>
    );
  }
}

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
