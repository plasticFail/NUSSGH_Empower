import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
//third party lib
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
//style
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
//component
import LeftArrowBtn from '../leftArrowBtn';
import Counter from '../../onboarding/medication/Counter';
//functions
import {isEmpty} from '../../../commonFunctions/common';
import SearchMedication from '../../onboarding/medication/searchMedication';
import {
  med_key,
  checkDosage,
  checkDosageText,
  checkRepeatMedicine,
} from '../../../commonFunctions/logFunctions';

const SelectMedicationModalContent = (props) => {
  const {showSelectModal, selectedMedList} = props;
  const {closeSelectModal, getSelectedMedicineFromModal} = props;
  const [dosage, setDosage] = useState(0);
  const [correctDosage, setCorrectDosage] = useState(0);
  const [selectedMedicine, setSelectedMedicine] = useState({});
  const [openSearchModal, setOpenSearchModal] = useState(false);

  useEffect(() => {
    //whenever selected medicine change, update dosage from selected
    if (!isEmpty(selectedMedicine)) {
      setDosage(selectedMedicine.dosage);
      setCorrectDosage(selectedMedicine.dosage);
    }
  }, [selectedMedicine]);

  const addMed = () => {
    getSelectedMedicineFromModal(selectedMedicine);
    closeSelectModal();
  };

  return (
    <Modal
      isVisible={showSelectModal}
      coverScreen={true}
      backdropOpacity={1}
      onBackButtonPress={() => closeSelectModal()}
      backdropColor={Colors.backgroundColor}
      style={{margin: 0}}>
      <View style={{flex: 1}}>
        <LeftArrowBtn close={closeSelectModal} />
        <Text style={globalStyles.pageHeader}>Select Medication</Text>
        <TouchableOpacity
          style={styles.searchInput}
          onPress={() => setOpenSearchModal(true)}>
          {isEmpty(selectedMedicine) === true ? (
            <Text style={{fontSize: 17, color: '#b5b5b5'}}>
              <Ionicons name="search" size={20} /> Name (eg. Metformin)
            </Text>
          ) : (
            <Text style={{fontSize: 17, color: 'black'}}>
              {selectedMedicine.drugName}
            </Text>
          )}
        </TouchableOpacity>
        <View style={{paddingStart: '3%', paddingEnd: '3%'}}>
          <Counter
            count={dosage}
            setCount={setDosage}
            parameter={'Unit (s)'}
            fieldName={'Default Dosage'}
          />
          {checkDosageText(dosage, correctDosage) !== '' && (
            <Text style={[globalStyles.alertText, {marginStart: '5%'}]}>
              {checkDosageText(dosage, correctDosage)}
            </Text>
          )}
          {checkRepeatMedicine(selectedMedicine, selectedMedList) && (
            <Text style={[globalStyles.alertText, {marginStart: '5%'}]}>
              You have added this medicine already.
            </Text>
          )}
        </View>
        <View style={{flex: 1}} />
        <View style={[globalStyles.buttonContainer]}>
          {checkDosage(dosage, correctDosage) &&
          !checkRepeatMedicine(selectedMedicine, selectedMedList) ? (
            <TouchableOpacity
              style={globalStyles.submitButtonStyle}
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
        <SearchMedication
          parent={med_key}
          visible={openSearchModal}
          closeModal={() => setOpenSearchModal(false)}
          selectedMedicine={selectedMedicine}
          setSelectedMedicine={setSelectedMedicine}
        />
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
