import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
//components
import HypoglycemiaBlock from './hypoglycemiaBlock';
import LeftArrowBtn from './leftArrowBtn';
//functions
import {
  checkBloodGlucoseText,
  checkBloodGlucose,
} from '../../commonFunctions/logFunctions';
//styles
import globalStyles from '../../styles/globalStyles';
import {Colors} from '../../styles/colors';
import logStyles from '../../styles/logStyles';
//third party lib
import Modal from 'react-native-modal';
import {sub} from 'react-native-reanimated';

const min_bg = 4;

const BloodGlucoseLogBlock = (props) => {
  const {
    visible,
    parent, //important when doing edit**
    bloodGlucose,
    eatSelection,
    exerciseSelection,
    alcholicSelection,
  } = props;
  const {
    closeModal,
    setBloodGlucose,
    setEatSelection,
    setExerciseSelection,
    setAlcoholSelection,
  } = props;

  console.log('Navigating to bg modal from ' + parent);

  const submitBg = () => {
    if (parent === 'addLog') {
      props.submitBg();
    } else {
      //handle edit **
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
      <View style={{flex: 1}}>
        <LeftArrowBtn close={closeModal} />
        <Text style={globalStyles.pageHeader}>Add Blood Glucose</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[logStyles.fieldName, styles.fieldStyle]}>
            Current Reading: (mmol/L)
          </Text>
          <TextInput
            style={[logStyles.inputField, styles.inputContainer]}
            placeholderTextColor="#a1a3a0"
            placeholder={bloodGlucose}
            keyboardType="decimal-pad"
            value={bloodGlucose}
            onChangeText={(value) => {
              setBloodGlucose(value);
            }}
          />
        </View>
        {checkBloodGlucoseText(bloodGlucose) !== '' && (
          <Text style={[globalStyles.alertText, {marginStart: '5%'}]}>
            {checkBloodGlucoseText(bloodGlucose)}
          </Text>
        )}

        <HypoglycemiaBlock
          eatSelection={eatSelection}
          setEatSelection={setEatSelection}
          exerciseSelection={exerciseSelection}
          setExerciseSelection={setExerciseSelection}
          alcholicSelection={alcholicSelection}
          setAlcoholSelection={setAlcoholSelection}
          bloodGlucose={bloodGlucose}
        />
      </View>
      <View style={[globalStyles.buttonContainer]}>
        {checkBloodGlucose(bloodGlucose) ? (
          <TouchableOpacity
            style={globalStyles.nextButtonStyle}
            onPress={() => submitBg()}>
            <Text style={globalStyles.actionButtonText}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={globalStyles.skipButtonStyle}>
            <Text style={globalStyles.actionButtonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    alignSelf: 'flex-end',
    flex: 1,
  },
  fieldStyle: {
    marginTop: '7%',
  },
});

export default BloodGlucoseLogBlock;
