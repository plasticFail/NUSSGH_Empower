import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
//third party lib
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';
// component
import LeftArrowBtn from '../leftArrowBtn';
import SelectMedicationModalContent from './selectMedicationModalContent';
import MedicationItem from '../../medicationItem';
import SuccessDialogue from '../../successDialogue';
// functions
import {
  checkDosage,
  handleSubmitMedication,
  med_key,
} from '../../../commonFunctions/logFunctions';
//style
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import logStyles from '../../../styles/logStyles';

Entypo.loadFont();

const MedicationLogBlock = (props) => {
  const {
    visible,
    parent, //important when doing edit**
    recordDate,
  } = props;
  const {closeModal, closeParent} = props;
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [selectedMedList, setSelectedMedList] = useState([]);
  const [success, setSuccess] = useState(false);

  const getSelectedMedicineFromModal = (medicineObj) => {
    console.log('Setting selected medication: ' + medicineObj);
    let list = selectedMedList;
    list.push(medicineObj);
    //set new states
    setShowSelectModal(false);
    setSelectedMedList(list);
  };

  const handleDelete = (item) => {
    setSelectedMedList(
      selectedMedList.filter((medication) => medication != item),
    );
  };

  const submit = () => {
    if (parent === 'addLog') {
      postMed();
    } else {
    }
  };

  const postMed = async () => {
    if (await handleSubmitMedication(recordDate, selectedMedList)) {
      setSuccess(true);
    }
  };

  const closeSuccess = () => {
    setSuccess(false);
    closeModal();
    closeParent();
  };

  return (
    <Modal
      isVisible={visible}
      coverScreen={true}
      backdropOpacity={1}
      onBackButtonPress={() => closeModal()}
      backdropColor={Colors.backgroundColor}
      style={{margin: 0}}>
      <View style={{flex: 1}}>
        <View style={logStyles.menuBarContainer}>
          <LeftArrowBtn close={closeModal} />
        </View>
        <View style={logStyles.bodyPadding}>
          <Text style={[logStyles.headerText, logStyles.componentMargin]}>Add Medication</Text>
          <Text style={[logStyles.fieldName,  logStyles.componentMargin]}>Medication Taken</Text>
          {/*List of medication added*/}
          <FlatList
            keyExtractor={(item) => item.drugName}
            data={selectedMedList}
            style={{flexGrow: 0}}
            renderItem={({item}) => (
              <MedicationItem
                medication={item}
                handleDelete={() => handleDelete(item)}
              />
            )}
          />
          <TouchableOpacity onPress={() => setShowSelectModal(true)}>
            <Text style={[logStyles.fieldName, {color: '#aad326'}]}>
              Select Medicine
            </Text>
          </TouchableOpacity>
          {/*Select medication modal */}
          {showSelectModal === true ? (
            <SelectMedicationModalContent
              showSelectModal={showSelectModal}
              closeSelectModal={() => setShowSelectModal(false)}
              selectedMedList={selectedMedList}
              getSelectedMedicineFromModal={getSelectedMedicineFromModal}
            />
          ) : null}
        </View>
        <View style={{flex: 1}} />
        <View style={globalStyles.buttonContainer}>
          {selectedMedList.length > 0 ? (
            <TouchableOpacity
              style={globalStyles.submitButtonStyle}
              onPress={() => submit()}>
              <Text style={globalStyles.actionButtonText}>Submit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={globalStyles.skipButtonStyle}>
              <Text style={globalStyles.actionButtonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {success ? (
        <SuccessDialogue
          visible={success}
          type={med_key}
          closeSuccess={closeSuccess}
        />
      ) : null}
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default MedicationLogBlock;
