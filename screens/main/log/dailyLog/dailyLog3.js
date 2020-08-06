import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import MedicationLogBlock from '../../../../components/logs/medicationLogBlock';
import {ScrollView} from 'react-native-gesture-handler';
import FormBlock from '../../../../components/logs/formBlock';

export default class MedicationLogBlok extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      show: false,
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
    this.getFormSelection = this.getFormSelection.bind(this);
  }

  //get form selection
  getFormSelection(boolValue) {
    console.log(boolValue);
    if (boolValue == true) {
      this.setState({show: true});
    } else {
      this.setState({show: false});
    }
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
      show,
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
        <View style={[styles.container, styles.shadow]}>
          <FormBlock
            question={'Did you take any medication today?'}
            getFormSelection={this.getFormSelection}
            selectNo={false}
          />
        </View>
        {show == true && (
          <ScrollView
            style={{
              width: Dimensions.get('window').width - 40,
            }}>
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
        )}
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
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    paddingBottom: '5%',
    borderRadius: 20,
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
