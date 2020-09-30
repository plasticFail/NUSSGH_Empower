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
//third party lib
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddGoalModal from '../../components/goals/addGoalModal';
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
import {getGoals} from '../../netcalls/requestsGoals';
import {
  bg,
  food,
  med,
  weight,
  activity,
  steps,
  renderGoalTypeName,
} from '../../commonFunctions/goalConstants';
import GoalDetail from '../../components/goals/goalDetail';

const height = Dimensions.get('window').height;

const GoalsScreen = (props) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [goals, setGoals] = useState({});
  const [showDown, setShowDown] = useState(true);
  const moveDownAnimation = useRef(new Animated.Value(0)).current;
  const [selectedGoal, setSelectedGoal] = useState({});
  const [selectedType, setSelectedType] = useState('');
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    initGoals();
  }, []);

  useEffect(() => {
    if (showDown) {
      runAnimation();
    }
  }, [showDown]);

  const initGoals = () => {
    getGoals().then((data) => {
      setGoals(data);
    });
  };

  const runAnimation = () => {
    setShowDown(true);
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
    outputRange: [height * 0.25, height * 0.3],
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
      <ScrollView
        style={{height: '1%'}}
        scrollEventThrottle={100}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            return removeAnimation();
          } else {
            setShowDown(true);
          }
        }}>
        {RenderGoalItems(goals, openGoalDetail)}
      </ScrollView>
      {showDown && (
        <Animated.View
          style={[
            {transform: [{translateY: heightInterpolation}]},
            {position: 'absolute', right: '2%'},
          ]}>
          <Icon
            name="arrow-circle-down"
            size={40}
            color={Colors.lastLogButtonColor}
            style={styles.downIcon}
          />
        </Animated.View>
      )}

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
      <View style={{flex: 1}} />

      <AddGoalModal
        visible={openAdd}
        close={() => setOpenAdd(false)}
        init={() => initGoals()}
      />
      <GoalDetail
        visible={showDetail}
        close={() => setShowDetail(false)}
        goalItem={selectedGoal}
        type={selectedType}
      />
    </View>
  );
};

export default GoalsScreen;

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
});
