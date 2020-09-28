import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  Dimensions,
  Easing,
} from 'react-native';
import CHEV_RIGHT from '../../resources/images/Patient-Icons/SVG/icon-grey-chevron-right.svg';
//styles
import globalStyles from '../../styles/globalStyles';
import {Colors} from '../../styles/colors';
import {horizontalMargins} from '../../styles/variables';
//component
import LeftArrowBtn from '../../components/logs/leftArrowBtn';
import ProgressBar from '../../components/progressbar';
import GoalList from '../../components/goals/goalList';
import LoadingModal from '../../components/loadingModal';
//third party lib
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddGoalModal from '../../components/goals/addGoalModal';
import {
  bg_key,
  renderLogIconNavy,
  food_key,
  med_key,
  weight_key,
  activity_key,
  step_key,
} from '../../commonFunctions/logFunctions';
import {getGoals} from '../../netcalls/requestsGoals';
import {
  bg,
  food,
  med,
  weight,
  activity,
  steps,
  renderGoalTypeName,
  isMonday,
} from '../../commonFunctions/goalFunctions';

const GoalsScreen = (props) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [goals, setGoals] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    initGoals();
  }, []);

  const initGoals = () => {
    console.log('getting latest goals');
    getGoals().then((data) => {
      setTimeout(() => setLoading(false), 1000);
      setGoals(data);
    });
  };

  return (
    <View style={globalStyles.pageContainer}>
      <View style={globalStyles.menuBarContainer}>
        <LeftArrowBtn close={() => props.navigation.navigate('Home')} />
      </View>
      <Text style={globalStyles.pageHeader}>Goals</Text>
      <Text style={[globalStyles.pageDetails, {marginBottom: '4%'}]}>
        Edit Your Targets
      </Text>
      <Text
        style={[globalStyles.goalFieldName, {marginTop: 0, marginStart: '3%'}]}>
        Your Goals
      </Text>
      <GoalList goals={goals} init={initGoals} />

      {isMonday() && (
        <TouchableOpacity
          onPress={() => setOpenAdd(true)}
          style={{flexDirection: 'row'}}>
          <AntDesign
            name="pluscircleo"
            color={'#aad326'}
            size={25}
            style={{margin: '2%'}}
          />
          <Text style={styles.addbutton}>Add Goal</Text>
        </TouchableOpacity>
      )}

      <Text
        style={[
          globalStyles.goalFieldName,
          {marginTop: '2%', marginStart: '3%'},
        ]}>
        Physician-Set Goals
      </Text>

      <Text
        style={[
          globalStyles.goalFieldName,
          {marginTop: '2%', marginStart: '3%'},
        ]}>
        Suggested Goal
      </Text>

      <AddGoalModal
        visible={openAdd}
        close={() => {
          console.log('closing add goal');
          initGoals();
          setOpenAdd(false);
        }}
      />
      <LoadingModal visible={loading} message={'Retrieving your goals'} />
    </View>
  );
};

export default GoalsScreen;

function renderGoalType(goalItem, type) {
  let progress = goalItem.progress + '%';
  return (
    <View
      style={{
        margin: '3%',
        flexDirection: 'row',
      }}>
      {renderGoalLogo(type)}
      <View style={{flex: 1}}>
        <Text style={styles.goalType}>{renderGoalTypeName(type)}</Text>
        <ProgressBar
          progress={progress}
          useIndicatorLevel={false}
          reverse={true}
          progressBarColor={'#aad326'}
          containerStyle={styles.progressContainer}
        />
        <Text
          style={[globalStyles.pageDetails, {marginStart: 0, marginTop: '2%'}]}>
          {goalItem.name}
        </Text>
      </View>
      <CHEV_RIGHT height={23} width={23} marginTop={'2%'} />
    </View>
  );
}

function renderGoalLogo(type) {
  switch (type) {
    case bg:
      return renderLogIconNavy(bg_key);
    case food:
      return renderLogIconNavy(food_key);
    case med:
      return renderLogIconNavy(med_key);
    case weight:
      return renderLogIconNavy(weight_key);
    case activity:
      return renderLogIconNavy(activity_key);
    case steps:
      return renderLogIconNavy(step_key);
  }
}

const styles = StyleSheet.create({
  addbutton: {
    marginStart: '2%',
    color: '#aad326',
    fontSize: 20,
    marginTop: '2%',
  },
  goalType: {
    fontFamily: 'SFProDisplay-Bold',
    color: Colors.lastLogValueColor,
    fontSize: 15,
    marginBottom: '2%',
  },
  progressContainer: {
    borderRadius: 9.5,
    height: 7,
  },
  border: {
    borderBottomWidth: 0.5,
    borderColor: Colors.lastLogValueColor,
    margin: '2%',
  },
  partyGoal: {
    marginStart: horizontalMargins,
    marginBottom: '2%',
    marginTop: 0,
  },
  noGoalsText: {
    fontFamily: 'SFProDisplay-Regular',
    color: Colors.alertColor,
    fontSize: 18,
    margin: '3%',
  },
});
