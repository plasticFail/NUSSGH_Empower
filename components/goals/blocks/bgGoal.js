import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
//third party lib
import Modal from 'react-native-modal';
import Moment from 'moment';
//styles
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
//component
import LeftArrowBtn from '../../logs/leftArrowBtn';
import NameDateSelector from '../nameDateSelector';
//styles
import logStyles from '../../../styles/logStyles';
//function
import {
  checkBloodGlucoseText,
  min_bg,
} from '../../../commonFunctions/logFunctions';
import {addBgGoalReq} from '../../../netcalls/requestsGoals';
import {defaultv} from '../../../commonFunctions/goalFunctions';
import {stat} from 'react-native-fs';

const min_key = 'min';
const max_key = 'max';

const BgGoal = (props) => {
  const {visible, parent, bg} = props;
  const {close} = props;
  const [goalName, setGoalName] = useState('');
  const [minBg, setMinBg] = useState('');
  const [maxBg, setMaxBg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [pageText, setPageText] = useState('Add Goal');

  useEffect(() => {
    if (parent != undefined || bg != undefined) {
      setGoalName(bg.name);
      setMinBg(String(bg.min_bg));
      setMaxBg(String(bg.max_bg));
      setPageText('Edit Goal');
      if (parent === defaultv) {
        setPageText('Add Goal');
      }
    }
  }, [bg]);

  useEffect(() => {
    check();
    showSubmitBtn();
  }, [minBg, maxBg, goalName]);

  const submit = async () => {
    let obj = {
      name: goalName,
      min_bg: Number(minBg),
      max_bg: Number(maxBg),
    };
    if (parent != undefined && parent != defaultv) {
      let status = await addBgGoalReq(obj, bg._id);
      if (status === 200) {
        Alert.alert('Blood glucose goal edited successfully', '', [
          {
            text: 'Got It',
            onPress: () => close(),
          },
        ]);
      } else {
        Alert.alert('Unexpected Error Occured', 'Please try again later!', [
          {
            text: 'Got It',
          },
        ]);
      }
    } else {
      let status = await addBgGoalReq(obj);
      if (status === 200) {
        Alert.alert('Blood glucose goal created successfully', '', [
          {
            text: 'Got It',
            onPress: () => close(),
          },
        ]);
      } else if (status === 400) {
        Alert.alert(
          'Already Exist',
          'Please remove your existing blood glucose goal before creating a new one!',
          [
            {
              text: 'Got It',
            },
          ],
        );
      } else {
        Alert.alert('Unexpected Error Occured', 'Please try again later!', [
          {
            text: 'Got It',
          },
        ]);
      }
    }
  };

  const showSubmitBtn = () => {
    if (
      maxBg != '' &&
      minBg != '' &&
      checkBloodGlucoseText(maxBg) === '' &&
      checkBloodGlucoseText(minBg) === '' &&
      goalName?.length != 0 &&
      errorMsg === ''
    ) {
      return true;
    } else {
      return false;
    }
  };

  const setFunction = (type, value) => {
    if (type === min_key) {
      setMinBg(value);
    }
    if (type === max_key) {
      setMaxBg(value);
    }
  };

  const check = () => {
    if (minBg != '' && maxBg != '') {
      let max = Number(maxBg);
      let min = Number(minBg);
      if (min <= min_bg || max <= min_bg) {
        setErrorMsg(
          'Please set a higher blood glucose level of more than ' +
            min_bg +
            ' mmol/L',
        );
        return;
      }

      if (max < min) {
        setErrorMsg(
          'Min blood glucose should be lesser than max blood glucose and vice versa',
        );
        return;
      }
      if (max === min) {
        setErrorMsg(
          'Min blood glucose should not be equal to maximum blood glucose',
        );
        return;
      }
    }
    setErrorMsg('');
    return;
  };

  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={() => close()}
      backdropOpacity={1}
      backdropColor={Colors.backgroundColor}
      style={{margin: 0}}>
      <View style={globalStyles.pageContainer}>
        <View style={globalStyles.menuBarContainer}>
          <LeftArrowBtn close={() => close()} />
        </View>

        <Text style={globalStyles.pageHeader}>{pageText}</Text>

        <Text style={[globalStyles.pageDetails, {marginBottom: '4%'}]}>
          Blood Glucose Goal
        </Text>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <NameDateSelector goalName={goalName} setGoalName={setGoalName} />
              {BgValue(minBg, setFunction, min_key)}
              {BgValue(maxBg, setFunction, max_key)}
              <Text style={[globalStyles.alertText, styles.spacing]}>
                {errorMsg}
              </Text>
              {checkBloodGlucoseText(minBg) != '' && (
                <Text style={[globalStyles.alertText, styles.spacing]}>
                  Min Reading: {checkBloodGlucoseText(minBg)}
                </Text>
              )}
              {checkBloodGlucoseText(maxBg) != '' && (
                <Text style={[globalStyles.alertText, styles.spacing]}>
                  Max Reading: {checkBloodGlucoseText(maxBg)}
                </Text>
              )}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <View style={[globalStyles.buttonContainer]}>
          {showSubmitBtn() === false ? (
            <TouchableOpacity style={globalStyles.skipButtonStyle}>
              <Text style={globalStyles.actionButtonText}>{pageText}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={globalStyles.submitButtonStyle}
              onPress={() => submit()}>
              <Text style={globalStyles.actionButtonText}>{pageText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default BgGoal;

function BgValue(value, setFunction, type) {
  return (
    <View style={{flexDirection: 'row'}}>
      {type === min_key ? (
        <Text
          style={[
            logStyles.fieldName,
            {color: Colors.lastLogValueColor, marginStart: '4%', flex: 1},
          ]}>
          Min Reading (mmol/L)
        </Text>
      ) : (
        <Text
          style={[
            logStyles.fieldName,
            {color: Colors.lastLogValueColor, marginStart: '4%', flex: 1},
          ]}>
          Max Reading (mmol/L)
        </Text>
      )}

      <TextInput
        style={[logStyles.inputField, {marginEnd: '4%', width: '20%'}]}
        placeholderTextColor="#a1a3a0"
        keyboardType="decimal-pad"
        returnKeyType="done"
        value={value}
        onChangeText={(input) => setFunction(type, input)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  spacing: {
    marginStart: '4%',
    marginEnd: '4%',
  },
});
