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

// Method to reset the tab navigation when navigating through pages
// Quite unclean during the development phase because of the warning shown.
const handleTabPress = ({navigation}, pathName) => {
  navigation.popToTop() && navigation.navigate(pathName);
};

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
        listeners={{
          tabPress: () => handleTabPress(props, 'Home'),
        }}
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
        listeners={{
          tabPress: () => handleTabPress(props, 'Reports'),
        }}
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
        listeners={{
          tabPress: () => handleTabPress(props, 'AddLog'),
        }}
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
        listeners={{
          tabPress: () => handleTabPress(props, 'Game Center'),
        }}
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
        listeners={{
          tabPress: () => handleTabPress(props, 'Chat'),
        }}
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
