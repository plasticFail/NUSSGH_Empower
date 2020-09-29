import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
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

const weeklyGoalList = [
  {name: 'Lose 0.2 kg per week', value: '-0.2'},
  {name: 'Lose 0.5 kg per week ', value: '-0.5'},
  {name: 'Lose 0.8 kg per week', value: '-0.8'},
  {name: 'Lose 1 kg per week', value: '-1'},
  {name: 'Maintain Weight', value: '0'},
  {name: 'Gain 0.2 kg per week', value: '+0.2'},
  {name: 'Gain 0.5 kg per week', value: '+0.5'},
];

const WeightGoal = (props) => {
  const {visible} = props;
  const {close} = props;

  const [goalName, setGoalName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [opened, setOpened] = useState(false); //opened date
  const [openedWeight, setOpenedWeight] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [weeklyGoal, setWeeklyGoal] = useState(weeklyGoalList[4]);
  const [weight, setWeight] = useState(50);

  useEffect(() => {
    showSubmitBtn();
  }, [goalName, opened]);

  const submit = () => {
    let obj = {
      goalName: goalName,
      startDate: Moment(startDate).format('DD/MM/YYYY HH:mm:ss'),
      endDate: Moment(endDate).format('DD/MM/YYYY HH:mm:ss'),
      weeklyGoal: weeklyGoal.value,
      goalWeight: weight,
    };
    console.log(obj);
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
        <Text style={globalStyles.pageHeader}>Add Goal</Text>
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
            <View style={{flexDirection: 'row'}}>
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
              <Text style={globalStyles.actionButtonText}>Add Goal</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={globalStyles.submitButtonStyle}
              onPress={() => submit()}>
              <Text style={globalStyles.actionButtonText}>Add Goal</Text>
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
