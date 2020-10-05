import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
//third party lib
import Modal from 'react-native-modal';
//styles
import {Colors} from '../../styles/colors';
import logStyles from '../../styles/logStyles';
import globalStyles from '../../styles/globalStyles';
import {horizontalMargins, normalTextFontSize} from '../../styles/variables';
//component
import LeftArrowBtn from '../logs/leftArrowBtn';
import SearchBarMed from './searchBarMed';
import RenderCounter from '../renderCounter';
import {isEmpty} from '../../commonFunctions/common';
import PeriodModal from './periodModal';

//returns selected medication, dosage and period
const AddMedicationModal = (props) => {
  const {visible, closeModal, currentMedList} = props;
  const [selectedMed, setSelectedMed] = useState({});
  const [dosage, setDosage] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [selectedString, setSelectedString] = useState('');

  const [openPeriodModal, setOpenPeriodModal] = useState(false);
  const [days, setDays] = useState([]);

  //check if medication being added already exist or not*
  //currentMedList vs selectedMedicine
  console.log(days);

  return (
    <Modal
      isVisible={visible}
      coverScreen={true}
      backdropOpacity={1}
      onBackButtonPress={() => closeModal()}
      backdropColor={Colors.backgroundColor}
      style={{margin: 0}}>
      <View style={logStyles.modalContainer}>
        <View style={logStyles.menuBarContainer}>
          <LeftArrowBtn close={closeModal} />
          <View style={{flex: 1}} />
        </View>
        <Text
          style={[globalStyles.pageHeader, {marginStart: horizontalMargins}]}>
          Add Mediciation
        </Text>
        <SearchBarMed
          selectedMed={selectedMed}
          setSelectedMed={setSelectedMed}
        />
        <RenderCounter
          fieldName="Default Dosage"
          item={dosage}
          setItem={setDosage}
          parameter={'Unit(s)'}
          allowInput={false}
          showUnitInParam={false}
          style={{marginStart: '3%', marginTop: '2%'}}
        />
        <RenderCounter
          fieldName="Frequency"
          item={frequency}
          setItem={setFrequency}
          parameter={'Per Day'}
          allowInput={false}
          showUnitInParam={false}
          style={{marginStart: '3%'}}
        />
        <Text
          style={[
            globalStyles.goalFieldName,
            {marginBottom: '2%', marginStart: '5%'},
          ]}>
          Recurring Period
        </Text>
        <TouchableOpacity
          style={styles.selectPeriodButton}
          onPress={() => setOpenPeriodModal(true)}>
          {days.length === 0 ? (
            <Text style={styles.selectPeriodText}>Select Period</Text>
          ) : days.length === 7 ? (
            <Text style={styles.chosenPeriodText}>Daily</Text>
          ) : (
            <Text style={styles.chosenPeriodText}>{selectedString}</Text>
          )}
        </TouchableOpacity>
        <PeriodModal
          visible={openPeriodModal}
          closeModal={() => setOpenPeriodModal(false)}
          days={days}
          setDays={setDays}
        />
      </View>
    </Modal>
  );
};

export default AddMedicationModal;

const styles = StyleSheet.create({
  selectPeriodButton: {
    backgroundColor: 'white',
    height: 45,
    width: '90%',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#e2e8ee',
    alignSelf: 'center',
    marginStart: '5%',
    marginEnd: '5%',
  },
  selectPeriodText: {
    fontSize: normalTextFontSize,
    textAlign: 'center',
    marginVertical: '2%',
  },
  chosenPeriodText: {
    fontSize: normalTextFontSize,
    textAlign: 'center',
    marginVertical: '2%',
    fontWeight: 'bold',
  },
});
