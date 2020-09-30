import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
//third party lib
import Modal from 'react-native-modal';
import moment from 'moment';
//styles
import {Colors} from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';
import logStyles from '../../styles/logStyles';
//function
import {getDateObj} from '../../commonFunctions/diaryFunctions';
import {normalTextFontSize} from '../../styles/variables';
import {
  weight,
  bg,
  food,
  med,
  activity,
  steps,
  weeklyGoalList,
  renderGoalTypeName,
  goalEnded,
  isMonday,
} from '../../commonFunctions/goalFunctions';
import {deleteGoal} from '../../netcalls/requestsGoals';
//component
import LeftArrowBtn from '../logs/leftArrowBtn';
import DeleteBin from '../deleteBin';
import CircularProgress from '../dashboard/todayOverview/CircularProgress';
import DeleteModal from '../deleteModal';
import BgGoal from './blocks/bgGoal';
import FoodGoal from './blocks/foodGoal';
import {goal} from '../../netcalls/urls';
import MedicationGoal from './blocks/medicationGoal';
import StepsGoal from './blocks/stepsGoal';
import ActivityGoal from './blocks/activityGoal';
import WeightGoal from './blocks/weightGoal';

//set default progress first
//havent differentiate who is setting the goal*
const progress = '50%';
const GoalDetail = (props) => {
  const {visible, goalItem, type} = props;
  const {close, init} = props;
  const [showDelete, setShowDelete] = useState(false);
  const [deleteContent, setDeleteContent] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  const showDate = (datestring) => {
    return moment(getDateObj(datestring)).format('DD MMM YYYY');
  };

  const formatFrequency = (string) => {
    return (
      String(string).substr(0, 1).toUpperCase() +
      String(string).substr(1, String(string).length - 1)
    );
  };

  const getWeightOffset = (number) => {
    let arr = weeklyGoalList.filter((item) => item.value === number);
    let string = String(arr[0].name).split(' per week');
    return string[0];
  };

  const confirmDelete = () => {
    setShowDelete(true);
    let content = goalItem.name + ' Goal';
    setDeleteContent(content);
  };

  const removeGoal = async () => {
    console.log('removing ' + type + ' ' + goalItem['_id']);
    if (await deleteGoal(type, goalItem._id)) {
      setShowDelete(false);
      init();
      close();
    } else {
      Alert.alert('Unexpected error occured!', 'Please try again later.', [
        {text: 'Got It'},
      ]);
    }
  };

  const showActionButton = () => {
    if (isMonday() && !goalEnded()) {
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
          <LeftArrowBtn close={close} />
        </View>
        <Text style={globalStyles.pageHeader}>View Goal</Text>
        <Text style={globalStyles.pageDetails}>Your Goals</Text>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {RenderProgressCard(type, goalItem.name, progress)}
          {RenderField('Start Date', showDate(goalItem.start_date))}
          {RenderField('End Date', showDate(goalItem.end_date))}
          {type === weight
            ? RenderField('Frequency', 'Weekly')
            : RenderField('Frequency', formatFrequency(goalItem.frequency))}

          {/*Render goal type specific fields*/}
          {type === bg ? (
            <>
              {RenderField('Min Reading', goalItem.min_bg, 'mmol/L')}
              {RenderField('Max Reading', goalItem.max_bg, 'mmol/L')}
            </>
          ) : type === food ? (
            <>
              {RenderField('Calories', goalItem.calories, 'cal')}
              {RenderField('Carbs', goalItem.carbs, 'g')}
              {RenderField('Fat', goalItem.fats, 'g')}
              {RenderField('Protein', goalItem.protein, 'g')}
            </>
          ) : type === med ? (
            <>
              {RenderField('Medication', goalItem.medication)}
              {RenderField('Dosage', goalItem.dosage, 'Unit(s)')}
            </>
          ) : type === weight ? (
            <>
              {RenderField('Goal Weight', goalItem.goal_weight, 'kg')}
              {RenderField(
                'Weekly Goal',
                getWeightOffset(goalItem.weekly_offset),
              )}
            </>
          ) : type === activity ? (
            <>
              {RenderField('Exercise', goalItem.duration, 'mins')}
              {RenderField('Cal Burnt', goalItem.cal_burnt, 'cal')}
            </>
          ) : (
            <>{RenderField('Min Steps', goalItem.steps)}</>
          )}
        </ScrollView>
      </View>
      {/*Should check if physician/ user set to show this action button**/}
      {showActionButton() && (
        <View style={globalStyles.buttonContainer}>
          <View style={{flexDirection: 'row'}}>
            <DeleteBin
              method={confirmDelete}
              style={{marginTop: '6%', marginStart: '2%'}}
            />
            <TouchableOpacity
              style={logStyles.enableEditButton}
              onPress={() => setShowEditModal(true)}>
              <Text style={globalStyles.actionButtonText}>Edit Goal</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/*Action modal**/}
      {type === bg && (
        <BgGoal
          visible={showEditModal}
          close={() => setShowEditModal(false)}
          parent="edit"
          bg={goalItem}
        />
      )}
      {type === food && (
        <FoodGoal
          visible={showEditModal}
          close={() => setShowEditModal(false)}
          parent="edit"
          food={goalItem}
        />
      )}
      {type === med && (
        <MedicationGoal
          visible={showEditModal}
          close={() => setShowEditModal(false)}
          parent="edit"
          med={goalItem}
        />
      )}
      {type === steps && (
        <StepsGoal
          visible={showEditModal}
          close={() => setShowEditModal(false)}
          parent="edit"
          step={goalItem}
        />
      )}
      {type === activity && (
        <ActivityGoal
          visible={showEditModal}
          close={() => setShowEditModal(false)}
          parent="edit"
          activity={goalItem}
        />
      )}
      {type === weight && (
        <WeightGoal
          visible={showEditModal}
          close={() => setShowEditModal(false)}
          parent="edit"
          weightObj={goalItem}
        />
      )}
      <DeleteModal
        visible={showDelete}
        close={() => setShowDelete(false)}
        item={deleteContent}
        confirmMethod={removeGoal}
      />
    </Modal>
  );
};

export default GoalDetail;

function RenderField(fieldName, fieldData, units) {
  let string = '';
  if (fieldData != null) {
    let stringLength = fieldData.length;
    string = fieldData;
    if (stringLength > 20) {
      string = string.substr(0, 20) + '...';
    }
  }
  return (
    <View style={[{flexDirection: 'row'}, globalStyles.goalFieldBottomBorder]}>
      <Text style={[globalStyles.goalFieldName, {flex: 1}]}>{fieldName}</Text>
      <Text style={styles.data}>
        {string} {units}
      </Text>
    </View>
  );
}

function RenderProgressCard(type, goalName, progress) {
  return (
    <View style={[styles.card, styles.shadow]}>
      <CircularProgress
        color="#aad326"
        percent={0.65}
        centreComponent={{
          width: 40 / 2,
          height: 40 / 2,
          component: <Text style={styles.percentageText}>{progress}</Text>,
        }}
        radius={40}
        padding={5}
        strokeWidth={5}
        fontSize={15}
      />
      <View style={{flex: 1}}>
        <Text style={globalStyles.pageDetails}>{renderGoalTypeName(type)}</Text>
        <Text style={[globalStyles.pageDetails, styles.goalName]}>
          {goalName}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  data: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: normalTextFontSize,
    marginTop: '3%',
    marginEnd: '4%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '3%',
    justifyContent: 'space-around',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  percentageText: {
    fontSize: 18,
    fontFamily: 'SFProDisplay-Bold',
    color: '#a8d126',
  },
  goalName: {
    color: '#8a8a8e',
    fontSize: 15,
    fontFamily: 'SFProDisplay-Regular',
  },
});
