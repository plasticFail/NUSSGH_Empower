import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import MedicationLogBlock from '../../../../components/logs/medicationLogBlock';
import {ScrollView} from 'react-native-gesture-handler';

export default class MedicationLogBlok extends React.Component {
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
    this.getMedicationListFromBlock = this.getMedicationListFromBlock.bind(
      this,
    );
    this.getDateSelected = this.getDateSelected.bind(this);
  }

  //get selected list past from the log block
  getMedicationListFromBlock(medicineList) {
    console.log('hihi');
    this.setState({selectedMedicationList: medicineList});
    console.log(this.state.selectedMedicationList);
  }

  //get selected date
  getDateSelected(date) {
    console.log('hihi2');
    this.setState({date: date});
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
      <View style={styles.screen}>
        <View style={styles.textContainer}>
          <Text style={[styles.text, {alignSelf: 'center'}]}>
            Step 3: Medication Log
          </Text>
        </View>
        <Image
          style={styles.progress}
          resizeMode="contain"
          source={require('../../../../resources/images/progress3.png')}
        />
        <ScrollView>
          <MedicationLogBlock
            calendarVisible={calendarVisible}
            selectedMedicationList={selectedMedicationList}
            selectModalOpen={selectModalOpen}
            editModalOpen={editModalOpen}
            medicineToEdit={medicineToEdit}
            getMedicationList={this.getMedicationListFromBlock}
            getDateSelected={this.getDateSelected}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  textContainer: {
    width: '100%',
  },
  text: {
    fontSize: 18,
  },
  progress: {
    width: '100%',
    height: 100,
  },
});
