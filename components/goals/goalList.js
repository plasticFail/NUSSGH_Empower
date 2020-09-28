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
import {isEmpty} from '../../commonFunctions/common';
import {goal} from '../../netcalls/urls';

const height = Dimensions.get('window').height;

const GoalList = (props) => {
  const {goals} = props;
  const {init} = props;
  const [showDown, setShowDown] = useState(true);
  const moveDownAnimation = useRef(new Animated.Value(0)).current;
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

  useEffect(() => {
    if (showDown) {
      runAnimation();
    }
  }, [showDown]);

  const runAnimation = () => {
    setShowDown(true);
    moveDownAnimation.setValue(0);
    Animated.loop(
      Animated.timing(moveDownAnimation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ).start();
  };

  const removeAnimation = () => {
    setShowDown(false);
    moveDownAnimation.setValue(0);
  };

  const heightInterpolation = moveDownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [height * -0.03, height * 0.01],
  });

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 30
    );
  };

  const isCloseToTop = ({layoutMeasurement, contentOffset, contentSize}) => {
    return contentOffset.y == 0;
  };

  const openGoalDetail = (item, type) => {
    setSelectedGoal(item);
    setSelectedType(type);
    setShowDetail(true);
  };

  return (
    <View style={{maxHeight: height * 0.27}}>
      {getNumofGoals(goals) != 0 ? (
        <>
          <ScrollView
            style={{flexGrow: 1}}
            scrollEventThrottle={100}
            onScroll={({nativeEvent}) => {
              if (isCloseToTop(nativeEvent)) {
                return runAnimation();
              }
              if (isCloseToBottom(nativeEvent)) {
                return removeAnimation();
              } else {
                setShowDown(true);
              }
            }}>
            {RenderGoalItems(goals, openGoalDetail)}
          </ScrollView>
          {getNumofGoals(goals) >= 3 && showDown && (
            <Animated.View
              style={[
                {transform: [{translateY: heightInterpolation}]},
                {position: 'absolute', right: '2%'},
              ]}>
              <Icon
                name="arrow-circle-down"
                size={30}
                color={Colors.lastLogButtonColor}
                style={styles.downIcon}
              />
            </Animated.View>
          )}
        </>
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
    </View>
  );
};

export default GoalList;

function RenderGoalItems(array, openGoalDetail) {
  return Object.keys(array).map((item, index) =>
    array[item].goals.map((goal, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={[{flex: 1}, styles.border]}
          onPress={() => openGoalDetail(goal, item)}>
          {renderGoalType(goal, item, openGoalDetail)}
        </TouchableOpacity>
      );
    }),
  );
}

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
