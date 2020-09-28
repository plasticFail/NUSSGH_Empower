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
import {ReportsScreen} from './main/reports';
//third party lib
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';
import GameCenter from './main/gameCenter';

import HOME from '../resources/images/Patient-Icons/SVG/icon-navy-footer-home.svg';
import HOME_FOCUSED from '../resources/images/Patient-Icons/SVG/icon-green-footer-home.svg';
import REPORTS from '../resources/images/Patient-Icons/SVG/icon-navy-footer-report.svg';
import REPORTS_FOCUSED from '../resources/images/Patient-Icons/SVG/icon-green-footer-report.svg';
import ADD from '../resources/images/Patient-Icons/SVG/icon-navy-footer-add.svg';
import ADD_FOCUSED from '../resources/images/Patient-Icons/SVG/icon-green-footer-add.svg';
import GAME from '../resources/images/Patient-Icons/SVG/icon-navy-footer-game.svg';
import GAME_FOCUSED from '../resources/images/Patient-Icons/SVG/icon-green-footer-game.svg';
import CHAT from '../resources/images/Patient-Icons/SVG/icon-navy-footer-chat.svg';
import CHAT_FOCUSED from '../resources/images/Patient-Icons/SVG/icon-green-footer-chat.svg';

const Tab = createBottomTabNavigator();

const iconStyle = {
  width: 30,
  height: 30,
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
          height: '10%',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <HOME_FOCUSED {...iconStyle} />;
            } else {
              return <HOME {...iconStyle} />;
            }
          },
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        options={{
          title: 'Reports',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <REPORTS_FOCUSED {...iconStyle} />;
            } else {
              return <REPORTS {...iconStyle} />;
            }
          },
        }}
      />
      <Tab.Screen
        name="AddLog"
        component={AddLog}
        options={{
          title: 'Add Log',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <ADD_FOCUSED {...iconStyle} />;
            } else {
              return <ADD {...iconStyle} />;
            }
          },
        }}
      />
      <Tab.Screen
        name="GameCenter"
        component={GameCenter}
        options={{
          title: 'Game Center',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <GAME_FOCUSED {...iconStyle} />;
            } else {
              return <GAME {...iconStyle} />;
            }
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: 'Chat',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <CHAT_FOCUSED {...iconStyle} />;
            } else {
              return <CHAT {...iconStyle} />;
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardScreen;
