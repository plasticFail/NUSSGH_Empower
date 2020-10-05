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
  bgpost,
  defaultv,
  phyv,
  selfv,
} from '../../commonFunctions/goalFunctions';
import {deleteGoal} from '../../netcalls/requestsGoals';
//component
import LeftArrowBtn from '../logs/leftArrowBtn';
import DeleteBin from '../deleteBin';
import CircularProgress from '../dashboard/todayOverview/CircularProgress';
import DeleteModal from '../deleteModal';
import ProgressBar from '../progressbar';

//set default progress first
//havent differentiate who is setting the goal*
const progress = 0.3;
const GoalDetail = (props) => {
  const {visible, goalItem, type} = props;
  const {close, init, deleteInit, openEditModal} = props;
  const [showDelete, setShowDelete] = useState(false);
  const [deleteContent, setDeleteContent] = useState('');

  const confirmDelete = () => {
    setShowDelete(true);
    let content = goalItem.name + ' Goal';
    setDeleteContent(content);
  };

  const removeGoal = async () => {
    let goalType = type;
    if (goalType === bg) {
      goalType = bgpost;
    }
    console.log('removing ' + goalType + ' ' + goalItem['_id']);
    if (await deleteGoal(goalType, goalItem._id)) {
      deleteInit();
      setShowDelete(false);
      close();
    } else {
      Alert.alert('Unexpected error occured!', 'Please try again later.', [
        {text: 'Got It'},
      ]);
    }
  };

  const showActionButton = () => {
    if (
      //isMonday() &&
      // !goalEnded(goalItem.end_date) &&
      goalItem?.set_by != phyv
    ) {
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
        {goalItem?.set_by === selfv ? (
          <Text style={globalStyles.pageDetails}>Your Goals</Text>
        ) : goalItem?.set_by === phyv ? (
          <Text style={globalStyles.pageDetails}>Set by physician</Text>
        ) : null}

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {type != food
            ? RenderProgressCard(type, goalItem?.name, progress)
            : RenderProgressBarCard(type, goalItem?.name, progress)}

          {/*Render goal type specific fields*/}
          {type === bg ? (
            <>
              {RenderField('Min Reading', goalItem?.min_bg, 'mmol/L')}
              {RenderField('Max Reading', goalItem?.max_bg, 'mmol/L')}
            </>
          ) : type === food ? (
            <>
              {RenderField('Calories', goalItem?.calories, 'cal')}
              {RenderField('Carbs', goalItem?.carbs, 'g')}
              {RenderField('Fat', goalItem?.fats, 'g')}
              {RenderField('Protein', goalItem?.protein, 'g')}
            </>
          ) : type === med ? (
            <>
              {RenderField('Medication', goalItem?.medication)}
              {RenderField('Dosage', goalItem?.dosage, 'Unit(s)')}
            </>
          ) : type === weight ? (
            <>{RenderField('Goal Weight', goalItem?.goal_weight, 'kg')}</>
          ) : type === activity ? (
            <>
              {RenderField('Exercise', goalItem?.duration, 'mins')}
              {RenderField('Cal Burnt', goalItem?.cal_burnt, 'cal')}
            </>
          ) : (
            <>{RenderField('Min Steps', goalItem?.steps)}</>
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
              onPress={() => openEditModal()}>
              <Text style={globalStyles.actionButtonText}>Edit Goal</Text>
            </TouchableOpacity>
          </View>
        </View>
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

function RenderProgressBarCard(type, goalName, progress) {
  let percent = '0%';
  if (progress != null) {
    percent = progress * 100 + '%';
  }
  return (
    <View
      style={[
        styles.card,
        styles.shadow,
        {flexDirection: 'column', alignItems: 'flex-start'},
      ]}>
      <Text style={globalStyles.pageDetails}>{renderGoalTypeName(type)}</Text>
      <Text
        style={[
          globalStyles.pageDetails,
          styles.goalName,
          {fontWeight: 'bold'},
        ]}>
        {goalName}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <ProgressBar
          containerStyle={{
            height: 20,
            marginBottom: 5,
            flex: 1,
            marginStart: '3%',
            marginEnd: '2%',
          }}
          progress={percent}
          reverse={false}
          useIndicatorLevel={true}
        />
        {progress > 0.65 ? (
          <View
            style={{
              flexDirection: 'column',
              alignSelf: 'flex-end',
            }}>
            <Text style={[styles.targetStyle, styles.foodpercent]}>
              {percent}
            </Text>
            <Text style={[styles.targetStyle, {color: '#ff0844'}]}>
              Not On Target
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'column',
              alignSelf: 'flex-end',
              marginTop: '-10%',
            }}>
            <Text
              style={[
                styles.targetStyle,
                styles.foodpercent,
                {color: Colors.lastLogButtonColor},
              ]}>
              {percent}
            </Text>
            <Text
              style={[styles.targetStyle, {color: Colors.lastLogButtonColor}]}>
              On Target
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

function RenderProgressCard(type, goalName, progress) {
  let percent = progress * 100 + '%';
  return (
    <View style={[styles.card, styles.shadow]}>
      <CircularProgress
        color="#aad326"
        percent={progress}
        centreComponent={{
          width: 40 / 2,
          height: 40 / 2,
          component: <Text style={styles.percentageText}>{percent}</Text>,
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
  targetStyle: {
    fontSize: 18,
  },
  foodpercent: {
    color: '#ff0844',
    alignSelf: 'flex-end',
    fontSize: 20,
  },
});
