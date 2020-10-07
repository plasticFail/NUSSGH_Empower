import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
//third party lib
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
//style
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
//component
import LeftArrowBtn from '../leftArrowBtn';
import SearchBarMed from '../../medication/searchBarMed';
import RenderCounter from '../../renderCounter';
//functions
import {isEmpty} from '../../../commonFunctions/common';
import SearchMedication from '../../medication/searchMedication';
import {
  med_key,
  checkRepeatMedicine,
  checkDosageText,
} from '../../../commonFunctions/logFunctions';
import logStyles from '../../../styles/logStyles';

const SelectMedicationModalContent = (props) => {
  const {showSelectModal, selectedMedList, recordDate, medplanlist} = props;
  const {closeSelectModal, getSelectedMedicineFromModal} = props;
  const [dosage, setDosage] = useState(0);
  const [selectedMedicine, setSelectedMedicine] = useState({});
  const [openSearchModal, setOpenSearchModal] = useState(false);

  const addMed = () => {
    selectedMedicine.dosage = dosage;
    getSelectedMedicineFromModal(selectedMedicine, 'extra');
    closeSelectModal();
  };

  const enableButton = () => {
    if (
      checkDosageText(dosage).length == 0 &&
      !checkRepeatMedicine(selectedMedicine, selectedMedList) &&
      !checkRepeatMedicine(selectedMedicine, medplanlist) &&
      !isEmpty(selectedMedicine)
    ) {
      return true;
    }
    return false;
  };

  return (
    <Modal
      isVisible={showSelectModal}
      coverScreen={true}
      backdropOpacity={1}
      onBackButtonPress={() => closeSelectModal()}
      backdropColor={Colors.backgroundColor}
      style={{margin: 0}}>
      <View style={logStyles.modalContainer}>
        <View style={globalStyles.menuBarContainer}>
          <LeftArrowBtn close={() => closeSelectModal()} />
          <View style={{flex: 1}} />
        </View>
        <Text style={globalStyles.pageHeader}>Select Medication</Text>
        <SearchBarMed
          selectedMed={selectedMedicine}
          setSelectedMed={setSelectedMedicine}
          clickable={true}
        />
        <View style={{paddingStart: '3%', paddingEnd: '3%'}}>
          <RenderCounter
            fieldName="Default Dosage"
            item={dosage}
            setItem={setDosage}
            parameter={'Unit(s)'}
            allowInput={false}
            showUnitInParam={false}
          />
          {checkRepeatMedicine(selectedMedicine, selectedMedList) ||
            (checkRepeatMedicine(selectedMedicine, medplanlist) && (
              <Text style={[globalStyles.alertText, {marginStart: '5%'}]}>
                You have added this medicine already.
              </Text>
            ))}
        </View>
        <View style={{flex: 1}} />
        <View style={[globalStyles.buttonContainer]}>
          {enableButton() ? (
            <TouchableOpacity
              style={globalStyles.nextButtonStyle}
              onPress={() => addMed()}>
              <Text style={globalStyles.actionButtonText}>Add</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={globalStyles.skipButtonStyle}>
              <Text style={globalStyles.actionButtonText}>Add</Text>
            </TouchableOpacity>
          )}
        </View>

        {/*Search Modal */}
        {openSearchModal ? (
          <SearchMedication
            parent={med_key}
            visible={openSearchModal}
            closeModal={() => setOpenSearchModal(false)}
            selectedMedicine={selectedMedicine}
            setSelectedMedicine={setSelectedMedicine}
            recordDate={recordDate}
          />
        ) : null}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    borderColor: '#e2e8ee',
    borderWidth: 1,
    borderRadius: 9.5,
    marginBottom: '3%',
    marginTop: '2%',
    padding: '2%',
    marginStart: '3%',
    marginEnd: '3%',
    backgroundColor: 'white',
  },
});

export default SelectMedicationModalContent;

//comment
