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
import LeftArrowBtn from '../leftArrowBtn';
import DateSelectionBlock from '../dateSelectionBlock';
//functions
import {
  checkBloodGlucoseText,
  checkBloodGlucose,
  handleSubmitBloodGlucose,
  min_bg,
  bg_key,
} from '../../../commonFunctions/logFunctions';
import {addGlucoseQuestionaire} from '../../../netcalls/requestsLog';
//styles
import globalStyles from '../../../styles/globalStyles';
import {Colors} from '../../../styles/colors';
import logStyles from '../../../styles/logStyles';
//third party lib
import Modal from 'react-native-modal';
import SuccessDialogue from '../../successDialogue';
import moment from 'moment';

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
  const [success, setSuccess] = useState(false);
  const [datetime, setDatetime] = useState(recordDate); //edit modal

  console.log('Navigating to bg modal from ' + parent);

  const submitBg = () => {
    if (parent === 'addLog') {
      postBg();
    } else {
      //handle edit **
      console.log('Editing Log');
      console.log(datetime);
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
      setSuccess(true);
    }
  };

  const closeSuccess = () => {
    setSuccess(false);
    closeModal();
    closeParent();
  };

  const setDate = (value) => {
    setDatetime(value);
  };

  console.log(moment(datetime).format('YYYY-MM-DD HH:mm'));

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
            <Text style={globalStyles.pageHeader}>Add Blood Glucose</Text>
            <Text style={[logStyles.fieldName, styles.fieldStyle]}>
              Current Reading
            </Text>
          </>
        ) : (
          <>
            <Text style={globalStyles.pageHeader}>Edit</Text>
            <DateSelectionBlock date={recordDate} setDate={setDate} />
            <Text style={[logStyles.fieldName, styles.fieldStyle]}>
              Reading
            </Text>
          </>
        )}

        <View style={{flexDirection: 'row'}}>
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
          <Text style={styles.unitText}>mmol/L</Text>
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
            style={globalStyles.submitButtonStyle}
            onPress={() => submitBg()}>
            <Text style={globalStyles.actionButtonText}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={globalStyles.skipButtonStyle}>
            <Text style={globalStyles.actionButtonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
      {success ? (
        <SuccessDialogue
          visible={success}
          type={bg_key}
          closeSuccess={closeSuccess}
        />
      ) : null}
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '40%',
  },
  fieldStyle: {
    marginTop: '7%',
  },
  unitText: {
    flex: 1,
    marginTop: '10%',
    fontSize: 18,
  },
});

export default BloodGlucoseLogBlock;
