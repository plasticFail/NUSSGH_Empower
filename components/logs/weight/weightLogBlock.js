import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
//components
import PickDrag from './pickDrag';
import LeftArrowBtn from '../leftArrowBtn';
import SuccessDialogue from '../../successDialogue';
import DateSelectionBlock from '../dateSelectionBlock';
//third party library
import Modal from 'react-native-modal';
import Ionicon from 'react-native-vector-icons/Ionicons';
//styles
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import logStyles from '../../../styles/logStyles';
//function
import {
  checkWeight,
  handleSubmitWeight,
  weight_key,
} from '../../../commonFunctions/logFunctions';
import {getDateObj} from '../../../commonFunctions/diaryFunctions';
import diaryStyles from '../../../styles/diaryStyles';

const WeightLogBlock = (props) => {
  const {
    visible,
    parent, //important when doing edit**
    recordDate,
    selectedLog, //to edit
  } = props;
  const {closeModal, closeParent} = props;
  const [weight, setWeight] = useState(50);
  const [success, setSuccess] = useState(false);

  //for editing
  const initialWeight = selectedLog ? selectedLog.weight : 0;
  const initialDate = selectedLog ? getDateObj(selectedLog.record_date) : '';
  const [datetime, setDatetime] = useState(initialDate);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (selectedLog != undefined) {
      setWeight(initialWeight);
      setDatetime(initialDate);
    }
  }, []);

  useEffect(() => {
    checkChange();
  }, [weight, datetime]);

  const submitWeight = () => {
    if (parent === 'addLog') {
      postWeight();
    } else {
      //handle edit**
      console.log('New Datetime: ' + datetime);
      console.log('New weight : ' + weight);
    }
  };

  const checkChange = () => {
    if (initialWeight === weight && String(datetime) === String(initialDate)) {
      setChanged(false);
      return;
    }
    setChanged(true);
    return;
  };

  const postWeight = async () => {
    if (await handleSubmitWeight(recordDate, weight)) {
      setSuccess(true);
    }
  };

  const closeSuccess = () => {
    setSuccess(false);
    closeModal();
    closeParent();
  };

  const getValue = (value) => {
    setWeight(value);
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
        <LeftArrowBtn close={closeModal} />
        {parent === 'addLog' ? (
          <>
            <Text style={globalStyles.pageHeader}>Add Weight</Text>
            <Text style={logStyles.fieldName}>Current Weight</Text>
          </>
        ) : (
          <>
            <Text style={globalStyles.pageHeader}>Edit</Text>
            <DateSelectionBlock date={datetime} setDate={setDatetime} />
            <Text style={logStyles.fieldName}>Weight</Text>
          </>
        )}

        <Text style={logStyles.fieldText}>{weight}kg</Text>
        <View style={{flex: 1}} />
        <PickDrag
          min={40}
          max={200}
          onChange={getValue}
          interval={0.2}
          value={weight}
        />
        <View style={{flex: 1}} />
        {parent === 'addLog' ? (
          <View style={[globalStyles.buttonContainer]}>
            {checkWeight(weight) ? (
              <TouchableOpacity
                style={globalStyles.submitButtonStyle}
                onPress={() => submitWeight()}>
                <Text style={globalStyles.actionButtonText}>Submit</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={globalStyles.skipButtonStyle}>
                <Text style={globalStyles.actionButtonText}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={[globalStyles.buttonContainer]}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={diaryStyles.binIcon}
                onPress={() => deleteLog()}>
                <Ionicon name="ios-trash-bin" size={40} color="#ff0844" />
              </TouchableOpacity>
              {checkWeight(weight) && changed ? (
                <TouchableOpacity
                  style={logStyles.enableEditButton}
                  onPress={() => submitWeight()}>
                  <Text style={globalStyles.actionButtonText}>Done</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={logStyles.disableEditButton}>
                  <Text style={globalStyles.actionButtonText}>Done</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
      {success ? (
        <SuccessDialogue
          visible={success}
          type={weight_key}
          closeSuccess={closeSuccess}
        />
      ) : null}
    </Modal>
  );
};

export default WeightLogBlock;
