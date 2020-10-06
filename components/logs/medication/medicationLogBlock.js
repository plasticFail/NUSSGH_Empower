import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
//third party lib
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
// component
import LeftArrowBtn from '../leftArrowBtn';
import SelectMedicationModalContent from './selectMedicationModalContent';
import ExtraMedItem from './extraMedItem';
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
import {ScrollView} from 'react-native-gesture-handler';

const extra = 'extra';

const MedicationLogBlock = (props) => {
  const {
    visible,
    parent, //important when doing edit**
    recordDate,
  } = props;
  const {closeModal, closeParent} = props;
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [selectedMedList, setSelectedMedList] = useState([]); //to submit for log
  const [extraAddedList, setExtraAddedList] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    combineArr();
  }, [selectedMedList, extraAddedList]);

  const getSelectedMedicineFromModal = (medicineObj, type) => {
    console.log('Setting selected medication: ' + medicineObj.medication);
    console.log(medicineObj.dosage);
    //format object before adding
    let obj = {
      dosage: medicineObj.dosage,
      unit: medicineObj.dosage_unit,
      drugName: medicineObj.medication,
    };

    if (type === extra) {
      let list = extraAddedList;
      list.push(obj);
      setExtraAddedList(list);
    } else {
      add2List(medicineObj);
    }
    //set new states
    setShowSelectModal(false);
  };

  const handleDelete = (item, type) => {
    if (type === extra) {
      setExtraAddedList(
        extraAddedList.filter((medication) => medication != item),
      );
    } else {
      setSelectedMedList(
        selectedMedList.filter((medication) => medication != item),
      );
    }
  };

  //for planned medicine - update dosage / add med
  const add2List = (item) => {
    let arr = selectedMedList;
    let found = false;
    for (var x of arr) {
      //if item exist, update dosage if change
      if (item.medication === x.medication) {
        if (item.dosage != x.dosage) {
          x.dosage = item.dosage;
          found = true;
        }
      }
    }
    //item does not exist
    if (found === false) {
      arr.push(item);
    }

    setSelectedMedList(arr);
  };

  const combineArr = () => {
    let newArr = selectedMedList.concat(extraAddedList);
    console.log(newArr);
    return newArr;
  };

  const submit = () => {
    if (parent === 'addLog') {
      //postMed();
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
        <View style={[logStyles.bodyPadding, {flex: 1}]}>
          <Text style={[logStyles.headerText, logStyles.componentMargin]}>
            Medication Taken
          </Text>
          <ScrollView contentContainerStyle={{flexGrow: 0}}>
            <Text style={[logStyles.fieldName, logStyles.componentMargin]}>
              Scheduled Medication
            </Text>
            {/* List of medication from plan */}
            <ScheduledMedicationList addMed={getSelectedMedicineFromModal} />
            <Text style={[logStyles.fieldName, logStyles.componentMargin]}>
              Other Medications Taken
            </Text>
            {/*List of extra medication added*/}
            {extraAddedList.map((item, index) => (
              <ExtraMedItem
                medication={item}
                handleDelete={() => handleDelete(item, extra)}
                key={index}
              />
            ))}
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
          </ScrollView>

          {/*Select medication modal */}
          {showSelectModal === true ? (
            <SelectMedicationModalContent
              showSelectModal={showSelectModal}
              closeSelectModal={() => setShowSelectModal(false)}
              selectedMedList={extraAddedList}
              getSelectedMedicineFromModal={getSelectedMedicineFromModal}
              recordDate={recordDate}
            />
          ) : null}
        </View>
        <View style={[globalStyles.buttonContainer]}>
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
