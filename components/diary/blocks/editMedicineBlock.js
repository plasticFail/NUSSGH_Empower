import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
//third party library
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
//style
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import logStyles from '../../../styles/logStyles';
import diaryStyles from '../../../styles/diaryStyles';
//component
import LeftArrowBtn from '../../logs/leftArrowBtn';
import DateSelectionBlock from '../../logs/dateSelectionBlock';
import Counter from '../../onboarding/medication/Counter';
//function
import {deleteMed} from '../../../netcalls/requestsDiary';
import RemoveModal from '../removeModal';
import {med_key} from '../../../commonFunctions/logFunctions';

const EditMedicineBlock = (props) => {
  const {visible, medicineToEdit, initialDate} = props;
  const {closeModal, init} = props;

  const [datetime, setDatetime] = useState(initialDate);
  const [changed, setChanged] = useState(false);
  const [dosage, setDosage] = useState(Number(medicineToEdit.dosage));
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    checkChange();
  }, [dosage, datetime]);

  const postChange = () => {
    console.log('New date: ' + moment(datetime).format('YYYY-MM-DD HH:mm'));
    console.log(dosage);
  };

  const requestDelete = () => {
    setDeleteModal(true);
  };

  const removeMedFromLog = () => {
    console.log('Deleting medication from log');
    deleteMed(medicineToEdit['_id']).then((response) => {
      if (response.message != null) {
        init();
        closeModal();
      }
    });
  };

  const checkChange = () => {
    if (
      String(initialDate) != String(datetime) ||
      dosage != Number(medicineToEdit.dosage)
    ) {
      setChanged(true);
      return;
    }
    setChanged(false);
    return;
  };

  return (
    <Modal
      isVisible={visible}
      coverScreen={true}
      backdropOpacity={1}
      onBackButtonPress={() => closeModal()}
      backdropColor={Colors.backgroundColor}
      style={{margin: 0}}>
      <View style={globalStyles.pageContainer}>
        <View style={globalStyles.menuBarContainer}>
          <LeftArrowBtn close={closeModal} />
        </View>
        <Text style={globalStyles.pageHeader}>Edit</Text>
        <View style={[logStyles.bodyPadding, {marginStart: 0}]}>
          <DateSelectionBlock date={datetime} setDate={setDatetime} />
          <Text style={logStyles.fieldName}>Medication Taken:</Text>
          <Text style={logStyles.inputField}>{medicineToEdit.medication}</Text>
          <Counter
            count={dosage}
            setCount={setDosage}
            parameter={'Unit (s)'}
            fieldName={'Default Dosage'}
          />
          {dosage === 0 && (
            <Text style={[globalStyles.alertText, {marginStart: '4%'}]}>
              Please input a valid dosage number
            </Text>
          )}
        </View>
      </View>
      <View style={[globalStyles.buttonContainer]}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={diaryStyles.binIcon}
            onPress={() => requestDelete()}>
            <FontAwesome name="trash-o" size={40} color="#ff0844" />
          </TouchableOpacity>
          {dosage != 0 && changed ? (
            <TouchableOpacity
              style={logStyles.enableEditButton}
              onPress={() => postChange()}>
              <Text style={globalStyles.actionButtonText}>Done</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={logStyles.disableEditButton}>
              <Text style={globalStyles.actionButtonText}>Done</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/*Delete confirmation modal */}
      {deleteModal ? (
        <RemoveModal
          visible={deleteModal}
          closeModal={() => setDeleteModal(false)}
          logType={med_key}
          itemToDeleteName={medicineToEdit.medication}
          deleteMethod={() => removeMedFromLog()}
        />
      ) : null}
    </Modal>
  );
};

export default EditMedicineBlock;
