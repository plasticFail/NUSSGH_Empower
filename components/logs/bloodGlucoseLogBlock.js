import React, {useState} from 'react';
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
  handleSubmitBloodGlucose,
  min_bg,
} from '../../commonFunctions/logFunctions';
//styles
import globalStyles from '../../styles/globalStyles';
import {Colors} from '../../styles/colors';
import logStyles from '../../styles/logStyles';
//third party lib
import Modal from 'react-native-modal';
import {addGlucoseQuestionaire} from '../../netcalls/requestsLog';

const BloodGlucoseLogBlock = (props) => {
  const {
    visible,
    parent, //important when doing edit**
    recordDate,
  } = props;
  const {closeModal, closeParent} = props;
  const [bloodGlucose, setBloodGlucose] = useState('');
  const [eatSelection, setEatSelection] = useState(false);
  const [exerciseSelection, setExerciseSelection] = useState(false);
  const [alcholicSelection, setAlcoholSelection] = useState(false);

  console.log('Navigating to bg modal from ' + parent);

  const submitBg = () => {
    if (parent === 'addLog') {
      postBg();
    } else {
      //handle edit **
    }
  };

  //submit value
  const postBg = async () => {
    if (await handleSubmitBloodGlucose(recordDate, bloodGlucose)) {
      if (Number(bloodGlucose) <= min_bg) {
        addGlucoseQuestionaire(
          eatSelection,
          exerciseSelection,
          alcholicSelection,
        ).then((response) => {
          console.log('sending questionaire');
        });
      }

      closeModal();
      closeParent();
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
