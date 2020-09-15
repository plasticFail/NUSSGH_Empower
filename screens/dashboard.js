import React from 'react';
import {StyleSheet} from 'react-native';
//third party libs
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//functions
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
//other screens
import Home from './main/home';
import AddLog from './main/log/addlog';
import ChatScreen from './main/chat';
import ReportsScreen from './main/reports';
//third party lib
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';
import GameCenter from './main/gameCenter';

const Tab = createBottomTabNavigator();
/*
function getMoreHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'More';

  switch (routeName) {
    case 'More':
      console.log('more');
      return 'More';
    case 'AccountDetail':
      console.log('Account Detail');
      return 'Account Detail';
    case 'Medication':
      console.log('Medication');
      return 'Medication';
  }
}
*/

const DashboardScreen = (props) => {
  Icon.loadFont();
  return (
    <Tab.Navigator
      backBehavior="none"
      tabBarOptions={{
        activeTintColor: '#16A950',
        inactiveTintColor: 'gray',
        adaptive: false,
        labelStyle: {
          fontSize: 12,
        },
        style: {
          height: '8%',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        options={{
          title: 'Reports',
          tabBarIcon: ({color, size}) => (
            <Icon name="book" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddLog"
        component={AddLog}
        options={{
          title: 'Add Log',
          tabBarIcon: ({color, size}) => (
            <Ant name="plussquareo" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="GameCenter"
        component={GameCenter}
        options={{
          title: 'Game Center',
          tabBarIcon: ({color, size}) => (
            <Icon name="gamepad" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: 'Chat',
          tabBarIcon: ({color, size}) => (
            <Icon name="wechat" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardScreen;
