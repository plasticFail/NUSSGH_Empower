import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
//third party lib
import Modal from 'react-native-modal';
//styles
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
//component
import LeftArrowBtn from '../../logs/leftArrowBtn';
import NameDateSelector from '../nameDateSelector';
import RenderCounter from '../renderCounter';
//function
import {maxSteps} from '../../../commonFunctions/diaryFunctions';
import {addStepsGoalReq} from '../../../netcalls/requestsGoals';

const StepsGoal = (props) => {
  const {visible, parent, step} = props;
  const {close} = props;

  const [goalName, setGoalName] = useState('');

  const [steps, setSteps] = useState(maxSteps);

  const [pageText, setPageText] = useState('Add Goal');

  useEffect(() => {
    if (parent != undefined && step != undefined) {
      setGoalName(step.name);
      setSteps(step.steps);
      setPageText('Edit Goal');
    }
  }, []);

  useEffect(() => {
    showSubmitBtn();
  }, [goalName]);

  const submit = () => {
    let obj = {
      name: goalName,
      steps: steps,
    };
    if (parent != undefined) {
      if (addStepsGoalReq(obj, step._id)) {
        Alert.alert('Step goal edited successfully', '', [
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
      if (addStepsGoalReq(obj)) {
        Alert.alert('Step goal created successfully', '', [
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
    }
  };

  const showSubmitBtn = () => {
    if (goalName.length > 0 && steps > 0) {
      return true;
    }
    return false;
  };

  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={() => close()}
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
          Steps Goal
        </Text>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <NameDateSelector goalName={goalName} setGoalName={setGoalName} />
              <RenderCounter
                fieldName="Min Steps"
                item={steps}
                setItem={setSteps}
                parameter={''}
              />
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

export default StepsGoal;

const styles = StyleSheet.create({
  spacing: {
    marginStart: '4%',
    marginEnd: '4%',
  },
});
