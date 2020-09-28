import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
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
import DropdownSelector from '../dropDownSelector';
import WeightDragModal from '../weightDragModal';
import {normalTextFontSize} from '../../../styles/variables';
//function
import {addWeightGoalReq} from '../../../netcalls/requestsGoals';
import {
  weeklyGoalList,
  getWeeklyObj,
} from '../../../commonFunctions/goalFunctions';
import {getDateObj} from '../../../commonFunctions/diaryFunctions';

const WeightGoal = (props) => {
  const {visible, parent, weightObj} = props;
  const {close} = props;

  const [goalName, setGoalName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [opened, setOpened] = useState(false); //opened date
  const [openedWeight, setOpenedWeight] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [weeklyGoal, setWeeklyGoal] = useState(weeklyGoalList[4]);
  const [weight, setWeight] = useState(50);

  const [pageText, setPageText] = useState('Add Goal');

  useEffect(() => {
    if (parent != undefined && weightObj != undefined) {
      setOpened(true);
      setOpenedWeight(true);
      setGoalName(weightObj.name);
      setStartDate(getDateObj(weightObj.start_date));
      setEndDate(getDateObj(weightObj.end_date));
      setWeight(weightObj.goal_weight);
      setWeeklyGoal(getWeeklyObj(weightObj.weekly_offset));
      setPageText('Edit Goal');
    }
  }, []);

  useEffect(() => {
    showSubmitBtn();
  }, [goalName, opened]);

  const submit = async () => {
    let obj = {
      name: goalName,
      start_date: Moment(startDate).format('DD/MM/YYYY HH:mm:ss'),
      end_date: Moment(endDate).format('DD/MM/YYYY HH:mm:ss'),
      weekly_offset: weeklyGoal.value,
      goal_weight: weight,
    };
    if (parent != undefined) {
      if (await addWeightGoalReq(obj, weightObj._id)) {
        Alert.alert('Weight goal editted successfully', '', [
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
      if (await addWeightGoalReq(obj)) {
        Alert.alert('Weight goal created successfully', '', [
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

  const openWeightPicker = () => {
    setShowPicker(true);
    setOpenedWeight(true);
  };

  //no selected weight*
  const closeWeightPicker = () => {
    setOpenedWeight(false);
    setShowPicker(false);
  };

  const showSubmitBtn = () => {
    if (opened && goalName.length > 0 && openedWeight) {
      return true;
    }
    return false;
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
          Weight Goal
        </Text>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <NameDateSelector
            goalName={goalName}
            setGoalName={setGoalName}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            opened={opened}
            setOpened={setOpened}
          />
          <TouchableOpacity
            onPress={() => openWeightPicker()}
            style={{marginBottom: '2%'}}>
            <View
              style={[
                {flexDirection: 'row'},
                globalStyles.goalFieldBottomBorder,
              ]}>
              <Text style={[globalStyles.goalFieldName, {flex: 1}]}>
                Goal Weight
              </Text>
              {!openedWeight ? (
                <Text style={styles.selectStyle}>Set Weight</Text>
              ) : (
                <Text style={[styles.selectStyle, {color: 'black'}]}>
                  {weight} kg
                </Text>
              )}
            </View>
          </TouchableOpacity>
          <DropdownSelector
            selected={weeklyGoal}
            setSelected={setWeeklyGoal}
            fieldName="Weekly Goal"
            optionList={weeklyGoalList}
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
      <WeightDragModal
        visible={showPicker}
        close={() => closeWeightPicker()}
        tick={() => setShowPicker(false)}
        weight={weight}
        setWeight={setWeight}
      />
    </Modal>
  );
};

export default WeightGoal;

const styles = StyleSheet.create({
  spacing: {
    marginStart: '4%',
    marginEnd: '4%',
  },
  selectStyle: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: normalTextFontSize,
    marginTop: '3%',
    marginEnd: '3%',
    color: '#aad326',
  },
});
