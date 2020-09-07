import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
//components
import PickDrag from './pickDrag';
import LeftArrowBtn from '../leftArrowBtn';
//third party library
import Modal from 'react-native-modal';
//styles
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import logStyles from '../../../styles/logStyles';
import {
  checkWeight,
  handleSubmitWeight,
} from '../../../commonFunctions/logFunctions';

const WeightLogBlock = (props) => {
  const {
    visible,
    parent, //important when doing edit**
    recordDate,
  } = props;
  const {closeModal, closeParent} = props;
  const [weight, setWeight] = useState(0);

  const submitWeight = () => {
    if (parent === 'addLog') {
      postWeight();
    } else {
      //handle edit**
    }
  };

  const postWeight = async () => {
    if (await handleSubmitWeight(recordDate, weight)) {
      closeModal();
      closeParent();
    }
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
        <Text style={globalStyles.pageHeader}>Add Weight</Text>
        <Text style={logStyles.fieldName}>Current Weight</Text>
        <Text style={logStyles.fieldText}>{weight}kg</Text>
        <View style={{flex: 1}} />
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
    </Modal>
  );
};

export default WeightLogBlock;