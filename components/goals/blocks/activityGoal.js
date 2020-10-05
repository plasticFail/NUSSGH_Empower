import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  maxDuration,
  maxCalBurnt,
  getDateObj,
} from '../../../commonFunctions/diaryFunctions';
//third party lib
import Modal from 'react-native-modal';
import Moment, {duration} from 'moment';
//styles
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
//component
import LeftArrowBtn from '../../logs/leftArrowBtn';
import NameDateSelector from '../nameDateSelector';
import FrequencySelector from '../dropDownSelector';
import RenderCounter from '../renderCounter';
import {addActivityGoalReq} from '../../../netcalls/requestsGoals';
import {
  getFrequency,
  activity,
  defaultv,
} from '../../../commonFunctions/goalFunctions';

const ActivityGoal = (props) => {
  const {visible, parent, activity} = props;
  const {close} = props;

  const [goalName, setGoalName] = useState('');

  const [minute, setMinute] = useState(maxDuration);
  const [calBurnt, setCalBurnt] = useState(maxCalBurnt);

  const [pageText, setPageText] = useState('Add Goal');

  console.log('herer');

  useEffect(() => {
    if (parent != undefined && activity != undefined) {
      setGoalName(activity.name);
      setMinute(activity.duration);
      setCalBurnt(activity.cal_burnt);
      setPageText('Edit Goal');
      if (parent === defaultv) {
        setPageText('Add Goal');
      }
    }
  }, []);

  useEffect(() => {
    check();
    showSubmitBtn();
  }, [goalName]);

  const submit = async () => {
    let obj = {
      name: goalName,
      duration: minute,
      cal_burnt: calBurnt,
    };
    if (parent != undefined) {
      if ((await addActivityGoalReq(obj, activity._id)) && parent != defaultv) {
        Alert.alert('Activity goal edited successfully', '', [
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
      if (await addActivityGoalReq(obj)) {
        Alert.alert('Activity goal created successfully', '', [
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
    if (goalName.length > 0 && minute > 0 && calBurnt > 0) {
      return true;
    }
    return false;
  };

  const check = () => {};

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
          Activity Goal
        </Text>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <NameDateSelector goalName={goalName} setGoalName={setGoalName} />
          <RenderCounter
            fieldName="Excercise"
            item={minute}
            setItem={setMinute}
            parameter={'mins'}
            maxLength={3}
          />
          <RenderCounter
            fieldName="Cal Burnt"
            item={calBurnt}
            setItem={setCalBurnt}
            parameter={'cal'}
            maxLength={4}
          />
        </ScrollView>
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

export default ActivityGoal;

const styles = StyleSheet.create({
  spacing: {
    marginStart: '4%',
    marginEnd: '4%',
  },
});
