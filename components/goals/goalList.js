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
import ProgressBar from '../../components/progressbar';
import GoalDetail from '../../components/goals/goalDetail';
//third party lib
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  bg_key,
  renderLogIconNavy,
  food_key,
  med_key,
  weight_key,
  activity_key,
  step_key,
} from '../../commonFunctions/logFunctions';
import {
  bg,
  food,
  med,
  weight,
  activity,
  steps,
  renderGoalTypeName,
  getNumofGoals,
  getGoalObjById,
} from '../../commonFunctions/goalFunctions';

const progress = 0.3;

const GoalList = (props) => {
  const {goals} = props;
  const {init} = props;
  const [selectedGoal, setSelectedGoal] = useState({});
  const [selectedType, setSelectedType] = useState('');
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    if (selectedGoal._id != null) {
      setSelectedGoal(getGoalObjById(selectedGoal._id, goals));
    } else {
      setSelectedGoal({});
    }
  }, [goals]);

  const openGoalDetail = (item, type) => {
    setSelectedGoal(item);
    setSelectedType(type);
    setShowDetail(true);
  };

  return (
    <>
      {getNumofGoals(goals) != 0 ? (
        RenderGoalItems(goals, openGoalDetail)
      ) : (
        <Text style={styles.noGoalsText}>No goals set yet!</Text>
      )}
      <GoalDetail
        visible={showDetail}
        close={() => setShowDetail(false)}
        goalItem={selectedGoal}
        type={selectedType}
        init={() => {
          init();
        }}
        deleteInit={() => {
          init();
          setSelectedGoal({});
        }}
      />
    </>
  );
};

export default GoalList;

function RenderGoalItems(array, openGoalDetail) {
  return Object.keys(array).map((item, index) =>
    array[item].goals.map((goal, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={styles.border}
          onPress={() => openGoalDetail(goal, item)}>
          {renderGoalType(goal, item)}
        </TouchableOpacity>
      );
    }),
  );
}

//later check who set the goal*
function renderGoalType(goalItem, type) {
  let percent = progress * 100 + '%';
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      {renderGoalLogo(type)}
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', marginBottom: '3%'}}>
          <Text style={styles.goalType}>{renderGoalTypeName(type)}</Text>
          <View style={[styles.byWhoTag, styles.shadow]}>
            <Text>Self</Text>
          </View>
        </View>
        <ProgressBar
          progress={percent}
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
  byWhoTag: {
    borderRadius: 20,
    backgroundColor: '#aad326',
    marginStart: '3%',
    paddingHorizontal: '3%',
    paddingVertical: '1%',
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
});
