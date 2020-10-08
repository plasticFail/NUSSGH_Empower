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
import AboutGoals from '../../components/goals/aboutGoals';
import GoalList from '../../components/goals/goalList';
import LoadingModal from '../../components/loadingModal';
import AddGoalModal from '../../components/goals/addGoalModal';
//third party lib
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//function
import {getGoals} from '../../netcalls/requestsGoals';
import {isMonday} from '../../commonFunctions/goalFunctions';
import InProgress from '../../components/inProgress';

const GoalsScreen = (props) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [goals, setGoals] = useState({});
  const [loading, setLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setLoading(true);
    initGoals();
    console.log(isMonday());
  }, []);

  const initGoals = async () => {
    console.log('getting latest goals');
    let data = await getGoals();
    setLoading(false);
    setGoals(data);
  };

  return (
    <View style={{...globalStyles.pageContainer, ...props.style}}>
      <View style={globalStyles.menuBarContainer}>
        <LeftArrowBtn close={() => props.navigation.navigate('Home')} />
      </View>
      <Text style={globalStyles.pageHeader}>Goals</Text>
      <InProgress />
    </View>
  );
};

export default GoalsScreen;

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
