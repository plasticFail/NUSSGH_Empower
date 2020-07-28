import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import MoreRootScreen from '../more/moreRoot';
import AccountDetailScreen from '../more/accountDetails';
import MedicationScreen from '../more/medications';
import HeaderIcon from '../../components/headerBtnIcon';
import AddLogScreen from './addlog';
import BloodGlucoseLog from '../sub/bloodGlucoseLog';
import {Header} from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();

const AddLogRoot = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="AddLog"
      headerMode="none"
      screenOptions={{animationEnabled: false}}>
      <Stack.Screen name="AddLog" component={AddLogScreen} headerMode="none" />
      <Stack.Screen name="BloodGlucoseLog" component={BloodGlucoseLog} />
    </Stack.Navigator>
  );
};

export default AddLogRoot;
