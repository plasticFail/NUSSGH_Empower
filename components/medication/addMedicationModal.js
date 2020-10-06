import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
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
import SelectPeriod from './period/selectPeriod';
import MedicationDeleteBin from './medicationDeleteBin';
//function
import {
  dayList,
  onboardAdd,
  checkMedExistInArr,
  onboardEdit,
  getSelectedCount,
} from '../../commonFunctions/medicationFunction';
import {isEmpty} from '../../commonFunctions/common';

//returns selected medication, dosage and period
const AddMedicationModal = (props) => {
  const {visible, closeModal, currentMedList, parent, med2Edit} = props;
  const {onAddMed, onEditMed, onDeleteMed} = props;
  const [selectedMed, setSelectedMed] = useState({});
  const [dosage, setDosage] = useState(0);
  const [frequency, setFrequency] = useState(0);

  const [openPeriodModal, setOpenPeriodModal] = useState(false);
  const [daysArr, setDaysArr] = useState();
  const [enableSearchBar, setEnableSearchBar] = useState(true);

  useEffect(() => {
    let arr = JSON.parse(JSON.stringify(dayList));
    setDaysArr(arr);
  }, []);

  useEffect(() => {
    if (parent === onboardEdit && med2Edit != undefined) {
      setSelectedMed(med2Edit);
      setDosage(med2Edit.dosage);
      setFrequency(med2Edit.per_day);
      setDaysArr(med2Edit.days);
      setEnableSearchBar(false);
    }
  }, [parent]);

  const enableBtn = () => {
    if (
      isEmpty(selectedMed) ||
      dosage === 0 ||
      frequency === 0 ||
      getSelectedCount(daysArr) === 0
    ) {
      return false;
    }
    return true;
  };

  const add2Plan = () => {
    let obj = {
      dosage: dosage,
      per_day: frequency,
      days: [...daysArr],
      medication: selectedMed.medication,
      dosage_unit: 'unit',
    };
    if (parent === onboardAdd) {
      //check if medication being added already exist or not*
      if (checkMedExistInArr(currentMedList, selectedMed)) {
        Alert.alert('You have already added this medication.', '', [
          {text: 'Got It'},
        ]);
      } else {
        onAddMed(obj);
        closeModal();
      }
    } else {
      onEditMed(obj);
      closeModal();
    }
  };

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
        {parent === onboardAdd ? (
          <Text
            style={[globalStyles.pageHeader, {marginStart: horizontalMargins}]}>
            Add Mediciation
          </Text>
        ) : (
          <Text
            style={[globalStyles.pageHeader, {marginStart: horizontalMargins}]}>
            Edit
          </Text>
        )}

        <SearchBarMed
          selectedMed={selectedMed}
          setSelectedMed={setSelectedMed}
          clickable={enableSearchBar}
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
        <SelectPeriod
          openPeriodModal={openPeriodModal}
          daysArr={daysArr}
          setDaysArr={setDaysArr}
          setOpenPeriodModal={setOpenPeriodModal}
        />
      </View>
      <View style={[globalStyles.buttonContainer]}>
        {parent === onboardAdd ? (
          enableBtn() ? (
            <TouchableOpacity
              style={globalStyles.nextButtonStyle}
              onPress={() => add2Plan()}>
              <Text style={globalStyles.actionButtonText}>Add</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={globalStyles.skipButtonStyle}
              onPress={() => add2Plan()}>
              <Text style={globalStyles.actionButtonText}>Add</Text>
            </TouchableOpacity>
          )
        ) : (
          <View style={{flexDirection: 'row'}}>
            <MedicationDeleteBin
              medication={selectedMed}
              deleteMethod={onDeleteMed}
            />
            {enableBtn() ? (
              <TouchableOpacity
                style={logStyles.enableEditButton}
                onPress={() => add2Plan()}>
                <Text style={globalStyles.actionButtonText}>Done</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  logStyles.enableEditButton,
                  {backgroundColor: '#e4e4e4'},
                ]}>
                <Text style={globalStyles.actionButtonText}>Done</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
};

export default AddMedicationModal;
