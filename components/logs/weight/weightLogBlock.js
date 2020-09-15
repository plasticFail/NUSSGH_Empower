import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
//components
import PickDrag from './pickDrag';
import LeftArrowBtn from '../leftArrowBtn';
import SuccessDialogue from '../../successDialogue';
//third party library
import Modal from 'react-native-modal';
//styles
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import logStyles from '../../../styles/logStyles';
import {
  checkWeight,
  handleSubmitWeight,
  weight_key,
} from '../../../commonFunctions/logFunctions';

const WeightLogBlock = (props) => {
  const {
    visible,
    parent, //important when doing edit**
    recordDate,
  } = props;
  const {closeModal, closeParent} = props;
  const [weight, setWeight] = useState(0);
  const [success, setSuccess] = useState(false);

  const submitWeight = () => {
    if (parent === 'addLog') {
      postWeight();
    } else {
      //handle edit**
    }
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
        <View style={logStyles.menuBarContainer}>
          <LeftArrowBtn close={closeModal} />
        </View>
        <View style={[logStyles.bodyPadding, {flex: 1}]}>
          <Text style={[logStyles.headerText, logStyles.componentMargin]}>Add Weight</Text>
          <Text style={[logStyles.fieldName]}>Current Weight</Text>
          <Text style={[logStyles.fieldText]}>{weight}kg</Text>
        </View>
        <PickDrag min={40} max={200} onChange={getValue} interval={0.2} />
        <View style={{flex: 1}} />
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
