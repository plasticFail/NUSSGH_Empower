import React, {useState, useEffect} from 'react';
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
import {getDateObj} from '../../../commonFunctions/diaryFunctions';
//styles
import globalStyles from '../../../styles/globalStyles';
import {Colors} from '../../../styles/colors';
import logStyles from '../../../styles/logStyles';
//third party lib
import Modal from 'react-native-modal';
import SuccessDialogue from '../../successDialogue';
import moment from 'moment';
import Ionicon from 'react-native-vector-icons/Ionicons';

const BloodGlucoseLogBlock = (props) => {
  const {
    visible,
    parent, //important when doing edit**
    recordDate,
    selectedLog, //to edit
  } = props;

  const {closeModal, closeParent} = props;
  const [bloodGlucose, setBloodGlucose] = useState('');
  const [eatSelection, setEatSelection] = useState(false);
  const [exerciseSelection, setExerciseSelection] = useState(false);
  const [alcholicSelection, setAlcoholSelection] = useState(false);
  const [success, setSuccess] = useState(false);

  //for editing
  const initialBg = selectedLog ? selectedLog.bg_reading : 0;
  const initialDate = selectedLog ? getDateObj(selectedLog.record_date) : '';
  const [datetime, setDatetime] = useState(initialDate);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    console.log('Navigating to bg modal from ' + parent);
    if (selectedLog != undefined) {
      setBloodGlucose(String(initialBg));
      setDatetime(initialDate);
    }
  }, []);

  useEffect(() => {
    checkChange();
  }, [datetime, bloodGlucose]);

  const submitBg = () => {
    if (parent === 'addLog') {
      postBg();
    } else {
      //handle edit (get the questionaire ans if have)
      console.log('Editing Log');
      console.log('New date: ' + moment(datetime).format('YYYY-MM-DD HH:mm'));
      console.log('New value: ' + bloodGlucose);
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

  //for edit
  const setDate = (value) => {
    setDatetime(value);
  };

  const checkChange = () => {
    if (bloodGlucose != initialBg || String(initialDate) != String(datetime)) {
      setChanged(true);
      return;
    }
    setChanged(false);
    return;
  };

  const deleteLog = () => {
    console.log('deleting log');
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
            <Text style={globalStyles.pageHeader}>Add Blood Glucose</Text>
            <Text style={[logStyles.fieldName, styles.fieldStyle]}>
              Current Reading
            </Text>
          </>
        ) : (
          <>
            <Text style={globalStyles.pageHeader}>Edit</Text>
            <DateSelectionBlock date={datetime} setDate={setDate} />
            <Text style={[logStyles.fieldName, styles.fieldStyle2]}>
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
      {parent === 'addLog' ? (
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
      ) : (
        <View style={[globalStyles.buttonContainer]}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.binIcon}
              onPress={() => deleteLog()}>
              <Ionicon name="ios-trash-bin" size={40} color="#ff0844" />
            </TouchableOpacity>
            {checkBloodGlucose(bloodGlucose) && changed === true ? (
              <TouchableOpacity
                style={logStyles.enableEditButton}
                onPress={() => submitBg()}>
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
  fieldStyle2: {
    marginTop: '2%',
  },
  unitText: {
    flex: 1,
    marginTop: '10%',
    fontSize: 18,
  },
  binIcon: {
    marginTop: '5%',
    marginStart: '2%',
  },
});

export default BloodGlucoseLogBlock;
