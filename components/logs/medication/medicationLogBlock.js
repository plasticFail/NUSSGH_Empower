import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
//third party lib
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
// component
import LeftArrowBtn from '../leftArrowBtn';
import SelectMedicationModalContent from './selectMedicationModalContent';
import MedicationItem from '../../medicationItem';
import SuccessDialogue from '../../successDialogue';
// functions
import {
  handleSubmitMedication,
  med_key,
} from '../../../commonFunctions/logFunctions';
//style
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import logStyles from '../../../styles/logStyles';
import ScheduledMedicationList from './scheduledMedicationList';

Entypo.loadFont();

const MedicationLogBlock = (props) => {
  const {
    visible,
    parent, //important when doing edit**
    recordDate,
  } = props;
  const {closeModal, closeParent} = props;
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [selectedMedList, setSelectedMedList] = useState([]); //to submit for log
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
      <View style={logStyles.modalContainer}>
        <View style={globalStyles.menuBarContainer}>
          <LeftArrowBtn close={closeModal} />
          <View style={{flex: 1}} />
        </View>
        <View style={logStyles.bodyPadding}>
          <Text style={[logStyles.headerText, logStyles.componentMargin]}>
            Medication Taken
          </Text>
          <Text style={[logStyles.fieldName, logStyles.componentMargin]}>
            Scheduled Medication
          </Text>
          <ScheduledMedicationList />
          <Text style={[logStyles.fieldName, logStyles.componentMargin]}>
            Other Medications Taken
          </Text>
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
          <TouchableOpacity
            onPress={() => setShowSelectModal(true)}
            style={{flexDirection: 'row'}}>
            <AntDesign
              name="pluscircleo"
              color={'#aad326'}
              size={25}
              style={{margin: '2%'}}
            />
            <Text style={[logStyles.fieldName, {color: '#aad326'}]}>
              Add Medication
            </Text>
          </TouchableOpacity>

          {/*Select medication modal */}
          {showSelectModal === true ? (
            <SelectMedicationModalContent
              showSelectModal={showSelectModal}
              closeSelectModal={() => setShowSelectModal(false)}
              selectedMedList={selectedMedList}
              getSelectedMedicineFromModal={getSelectedMedicineFromModal}
              recordDate={recordDate}
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
